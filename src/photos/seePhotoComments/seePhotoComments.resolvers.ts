import { Resolver } from "../../types";

const resolver: Resolver = (_, { id, offset }, { client }) =>
  client.comment.findMany({
    take: 2,
    skip: offset,
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

export default {
  Query: {
    seePhotoComments: resolver,
  },
};
