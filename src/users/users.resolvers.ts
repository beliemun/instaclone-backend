import client from "../client";
import { Resolvers } from "../types";

const resolvers: Resolvers = {
  User: {
    totalFollowing: ({ id }, _: any, { client }) =>
      client.user.count({ where: { followers: { some: { id } } } }),
    totalFollowers: ({ id }, _: any, { client }) =>
      client.user.count({ where: { following: { some: { id } } } }),
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
      const following = await client.user
        .findUnique({ where: { userName: loggedInUser.userName } })
        .following({ where: { id } });
      return following.length !== 0;
    },
    photos: ({ id }, _, { client }) =>
      client.user.findUnique({ where: { id } }).photos(),
    totalPhotos: ({ id }, _, { client }) =>
      client.photo.count({ where: { userId: id } }),
  },
};

export default resolvers;
