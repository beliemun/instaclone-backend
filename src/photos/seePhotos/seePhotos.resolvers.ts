import { Resolver } from "../../types";

const resolver: Resolver = async (_: any, { userName }, { client }) =>
  client.photo.findMany({
    where: {
      user: {
        userName,
      },
    },
  });

export default {
  Query: {
    seePhotos: resolver,
  },
};
