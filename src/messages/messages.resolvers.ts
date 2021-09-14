import client from "../client";
import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Room: {
    users: ({ id }) => client.room.findUnique({ where: { id } }).users(),
    messages: ({ id }) =>
      client.message.findMany({
        where: { roomId: id },
        orderBy: { createdAt: "desc" },
      }),
    lastMessage: ({ id }) =>
      client.message.findFirst({
        where: { roomId: id },
        orderBy: { createdAt: "desc" },
      }),
    unreadTotal: ({ id }, _, { loggedInUser }) =>
      loggedInUser
        ? client.message.count({
            where: {
              read: false,
              roomId: id,
              user: {
                id: {
                  not: loggedInUser.id,
                },
              },
            },
          })
        : 0,
  },
  Message: {
    user: ({ id }) => client.message.findUnique({ where: { id } }).user(),
  },
};

export default resolvers;
