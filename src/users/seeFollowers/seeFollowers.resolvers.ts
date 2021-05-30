import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFollowers: async (_: any, { userName, page }, { client }) => {
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
      const followers = await client.user
        .findUnique({ where: { userName } })
        .followers({
          skip: (page - 1) * 5,
          take: 5,
        });
      const totalFollowers = await client.user.count({
        where: { followings: { some: { userName } } },
      });
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5),
      };
      //   const bFollowers = await client.user.findMany({
      //     where: { followings: { some: { userName } } },
      //   });
    },
  },
};

export default resolvers;
