import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolver: Resolver = async (_, __, { loggedInUser, client }) =>
  client.photo.findMany({
    where: {
      OR: [
        {
          user: {
            followers: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        },
        {
          user: { id: loggedInUser.id },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

export default {
  Query: {
    seeFeed: resolver,
  },
};
