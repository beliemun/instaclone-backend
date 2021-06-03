import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolver: Resolver = async (_, { id }, { loggedInUser, client }) => {
  const message = await client.message.findFirst({
    where: {
      id,
      userId: {
        not: loggedInUser.id,
      },
      room: {
        users: {
          some: {
            id: loggedInUser.id,
          },
        },
      },
    },
    select: {
      id: true,
    },
  });
  if (!message) {
    return {
      ok: false,
      error: "Message not found.",
    };
  }
  await client.message.update({
    where: {
      id,
    },
    data: {
      read: true,
    },
  });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    readMessage: protectedResolver(resolver),
  },
};
