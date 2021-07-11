import { Resolver } from "../types";

const resolver: Resolver = async (_, { id, offset }, { client }) => {
  const likes = await client.like.findMany({
    take: 2,
    skip: offset,
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
