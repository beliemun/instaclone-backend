import { Resolvers } from "../types";

const resolvers: Resolvers = {
  User: {
    totalFollowings: ({ id }, _: any, { client }) =>
      client.user.count({ where: { followers: { some: { id } } } }),
    totalFollowers: ({ id }, _: any, { client }) =>
      client.user.count({ where: { followings: { some: { id } } } }),
    isMe: ({ id }, _: any, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _: any, { loggedInUser, client }) => {
      if (!loggedInUser) {
        return false;
      }
      const followers = await client.user
        .findUnique({ where: { userName: loggedInUser.userName } })
        .followers({ where: { id } });
      return followers.length !== 0;
    },
    photos: ({ id }, {}, { client }) =>
      client.user.findUnique({ where: { id } }).photos(),
  },
};

export default resolvers;
