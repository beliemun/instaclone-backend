import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Comment: {
    isMine: ({ userId }, _, { loggedInUser, client }) =>
      loggedInUser ? userId === loggedInUser.id : false,
  },
};

export default resolvers;
