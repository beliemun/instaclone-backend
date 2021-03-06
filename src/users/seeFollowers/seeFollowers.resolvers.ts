import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFollowers: async (_: any, { userName, offset, take }, { client }) =>
      client.user.findUnique({ where: { userName } }).followers({
        skip: offset,
        take,
        orderBy: {
          createdAt: "desc",
        },
      }),

    // 페이지 방식일 때 아래와 같이 처리
    // const ok = await client.user.findUnique({
    //   where: { userName },
    //   select: { id: true },
    // });
    // if (!ok) {
    //   return {
    //     ok: false,
    //     error: "User not found",
    //   };
    // }
    // const followers = await client.user
    //   .findUnique({ where: { userName } })
    //   .followers({
    //     skip: offset,
    //     take,
    //     orderBy: {
    //       createdAt: "desc",
    //     },
    //   });
    // .followers({
    //   skip: (page - 1) * 5,
    //   take: 5,
    // });
    // const totalFollowers = await client.user.count({
    //   where: { following: { some: { userName } } },
    // });
    // return {
    //   ok: true,
    //   followers,
    // totalPages: Math.ceil(totalFollowers / 5),
    // };
    //   const bFollowers = await client.user.findMany({
    //     where: { following: { some: { userName } } },
    //   });
  },
};

export default resolvers;
