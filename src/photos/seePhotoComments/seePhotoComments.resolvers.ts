import { Resolver } from "../../types";

const resolver: Resolver = (_, { id, offset, take }, { client }) => {
  console.log("take:", take);
  return client.comment.findMany({
    skip: offset,
    take,
    where: {
      photoId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });
};

export default {
  Query: {
    seePhotoComments: resolver,
  },
};
