import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeProfile: (_: any, { userName }, { client }) =>
      client.user.findUnique({
        where: { userName },
        include: { followings: true, followers: true },
      }),
  },
};

export default resolvers;
