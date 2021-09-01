import { READ_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolver: Resolver = async (_, { roomId }, { loggedInUser, client }) => {
  await client.message.updateMany({
    where: {
      roomId,
      userId: {
        not: loggedInUser.id,
      },
      read: false,
    },
    data: {
      read: true,
    },
  });
  const room = await client.room.findUnique({
    where: {
      id: roomId,
    },
  });
  pubsub.publish(READ_MESSAGE, { readMessageUpdate: { ...room } });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    readMessages: protectedResolver(resolver),
  },
};
