import { Resolver } from "../../types";

const resolver: Resolver = async (_: any, { id }, { client }) =>
  client.photo.findUnique({
    where: {
      id,
    },
  });

export default {
  Query: {
    seePhoto: resolver,
  },
};
