import { Resolver } from "../../types";

const resolver: Resolver = (_, { keyword }, { client }) =>
  client.photo.findMany({ where: { caption: { contains: keyword } } });

export default {
  Query: {
    searchPhotos: resolver,
  },
};
