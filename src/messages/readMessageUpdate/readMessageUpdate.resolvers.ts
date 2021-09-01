import { withFilter } from "graphql-subscriptions";
import { READ_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Resolver } from "../../types";

const resolver: Resolver = async (root, args, context, info) => {
  const { client, loggedInUser } = context;
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
    () => pubsub.asyncIterator(READ_MESSAGE),
    async ({ readMessageUpdate }, { id }) => {
      if (readMessageUpdate.id === id) {
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
        return room ? true : false;
      }
    }
  )(root, args, context, info);
};

export default {
  Subscription: {
    readMessageUpdate: {
      subscribe: resolver,
    },
  },
};
