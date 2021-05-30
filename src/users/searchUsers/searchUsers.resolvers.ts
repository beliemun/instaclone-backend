import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_: any, { keyword }, { client }) =>
      await client.user.findMany({
        where: { userName: { startsWith: keyword.toLowerCase() } },
      }),
  },
};

export default resolvers;
