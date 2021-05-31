import { Resolver } from "../../types";

const resolver: Resolver = (_, { id }, { client }) =>
  client.comment.findMany({
    where: {
      photoId: id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

export default {
  Query: {
    seePhotoComments: resolver,
  },
};
