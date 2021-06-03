import { Resolver } from "../../types";

const resolver: Resolver = (_, { id }, { loggedInUser, client }) =>
  client.room.findFirst({
    where: {
      id,
      users: {
        some: {
          id: loggedInUser.id,
        },
      },
    },
  });
export default {
  Query: {
    seeRoom: resolver,
  },
};
