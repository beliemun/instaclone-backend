import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFollowing: async (_: any, { userName, offset, take }, { client }) =>
      client.user.findUnique({ where: { userName } }).following({
        skip: offset,
        take,
        orderBy: {
          createdAt: "desc",
        },
      }),

    // 페이지 방식일 때 아래와 같이 구현할 수 있다.
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
    // const following = await client.user
    //   .findUnique({ where: { userName } })
    //   .following({
    //     skip: offset,
    //     take,
    //     orderBy: {
    //       createdAt: "desc",
    //     },
    //   });
    // .following({
    //   skip: lastId ? 1 : 0,
    //   take: 5,
    //   ...(lastId && { cursor: { id: lastId } }),
    // });
    // return {
    //   ok: true,
    //   following,
    // };
  },
};

export default resolvers;
