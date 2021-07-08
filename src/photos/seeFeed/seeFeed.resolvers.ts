import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolver: Resolver = async (_, { offset }, { loggedInUser, client }) =>
  client.photo.findMany({
    take: 2,
    skip: offset,
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
    seeFeed: protectedResolver(resolver),
  },
};
