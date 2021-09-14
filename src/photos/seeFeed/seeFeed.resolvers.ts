import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolver: Resolver = async (
  _,
  { offset, take },
  { loggedInUser, client }
) =>
  client.photo.findMany({
    take,
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
