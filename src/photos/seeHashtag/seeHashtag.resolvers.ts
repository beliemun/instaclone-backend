import { hash } from "bcrypt";
import { Resolver } from "../../types";

const resolver: Resolver = async (_: any, { hashtag }, { client }) =>
  client.hashtag.findUnique({ where: { hashtag } });

export default {
  Query: {
    seeHashtag: resolver,
  },
};
