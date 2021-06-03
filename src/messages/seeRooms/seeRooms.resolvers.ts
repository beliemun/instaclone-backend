import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolver: Resolver = async (_, __, { loggedInUser, client }) =>
  client.room.findMany({
    where: {
      users: {
        some: {
          id: loggedInUser.id,
        },
      },
    },
  });

export default {
  Query: {
    seeRooms: protectedResolver(resolver),
  },
};
