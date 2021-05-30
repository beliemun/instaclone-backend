import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFollowings: async (_: any, { userName, lastId }, { client }) => {
      const ok = await client.user.findUnique({
        where: { userName },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      const followings = await client.user
        .findUnique({ where: { userName } })
        .followings({
          skip: lastId ? 1 : 0,
          take: 5,
          ...(lastId && { cursor: { id: lastId } }),
        });
      return {
        ok: true,
        followings,
      };
    },
  },
};

export default resolvers;
