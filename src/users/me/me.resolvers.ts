import { Resolver } from "../../types";
import { protectedResolver } from "../users.utils";

const resolver: Resolver = (_, __, { loggedInUser, client }) =>
  client.user.findUnique({
    where: {
      id: loggedInUser.id,
    },
  });

export default {
  Query: {
    me: protectedResolver(resolver),
  },
};
