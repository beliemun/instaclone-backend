import { withFilter } from "graphql-subscriptions";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Resolver } from "../../types";

const resolver: Resolver = async (root, args, context, info) => {
  const { client, loggedInUser } = context;
  // room이 존재하지 않을 경우, roomUpdate를 리스닝하지 못하도록 구현.
  // ** 리스닝을 하기 전(프론트에서 SubscribeToMore 호출 시 이 곳으로 들어옴) **
  const room = await client.room.findFirst({
    where: {
      id: args.id,
      users: {
        some: {
          id: loggedInUser.id,
        },
      },
    },
    select: {
      id: true,
    },
  });
  if (!room) {
    throw new Error("The room you are in does not exist.");
  }
  return withFilter(
    () => pubsub.asyncIterator(NEW_MESSAGE),
    async ({ newMessageUpdate }, { id }) => {
      // { roomUpdates } 는 sendMessages에서 보낸 payload
      // { id } 는 현재 리스닝하고 있는 방의 id
      // ** [중요] 리스닝을 한 후에 확인하는 방법(리스닝 중에 차단을 당하거나 방을 나갔을 경우) **
      if (newMessageUpdate.roomId === id) {
        const room = await client.room.findFirst({
          where: {
            id,
            users: {
              some: {
                id: loggedInUser.id,
                // id만으로 방의 유일성은 성립되지만,
                // 중간에 차단을 당하거나 방을 나간 경우에도 조건이 성립되므로
                // some 조건이 덧붙혀졌다.
              },
            },
          },
          select: {
            id: true,
          },
        });
        return room ? true : false;
      }
    }
  )(root, args, context, info);
  // **매우 중요** 함수를 호출해야하므로 뒤에 ()추가
  // protected resolvers랑 비슷. function이 또다른 function을 리턴.
};

export default {
  Subscription: {
    newMessageUpdate: {
      subscribe: resolver,
    },
  },
};
