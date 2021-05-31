import { Resolver } from "../types";

const resolver: Resolver = async (_, { id }, { client }) => {
  const likes = await client.like.findMany({
    where: {
      photoId: id,
    },
    select: {
      user: true,
    },
  });
  return likes.map((like) => like.user);
};

export default {
  Query: {
    seePhotoLikes: resolver,
  },
};
