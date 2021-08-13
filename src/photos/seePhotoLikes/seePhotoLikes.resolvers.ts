import { CodeStarNotifications } from "aws-sdk";
import { Resolver } from "../../types";

const resolver: Resolver = async (_, { id, offset, take }, { client }) => {
  console.log("PhotoLikes:", take);
  const likes = await client.like.findMany({
    skip: offset,
    take,
    where: {
      photoId: id,
    },
    orderBy: {
      createdAt: "asc",
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
