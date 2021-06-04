import { withFilter } from "graphql-subscriptions";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Resolver } from "../../types";

const resolver: Resolver = async (root, args, context, info) => {
  const { client, loggedInUser } = context;
  // room이 존재하지 않을 경우, roomUpdate를 리스닝하지 못하도록 구현.
  // ** 리스닝을 하기 전에 확인하는 방법 **
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
    throw new Error("You shall not see this.");
  }
  return withFilter(
    () => pubsub.asyncIterator(NEW_MESSAGE),
    async ({ roomUpdates }, { id }) => {
      // roomUpdates.roomId는 playload(sendMessage)를 할 때의 지정된 방
      // id는 리스닝할 방
      // ** 리스닝을 한 후에 확인하는 방법(리스닝 중에 방을 나갔을 경우) **
      if (roomUpdates.roomId === id) {
        const room = await client.room.findFirst({
          where: {
            id,
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
        console.log(`loggedInUser.id: ${loggedInUser.id}`);
        return room ? true : false;
      }
    }
  )(root, args, context, info);
  // **매우 중요** 함수를 호출해야하므로 뒤에 ()추가
  // protected resolvers랑 비슷. function이 또다른 function을 리턴.
};

export default {
  Subscription: {
    roomUpdates: {
      subscribe: resolver,
    },
  },
};
