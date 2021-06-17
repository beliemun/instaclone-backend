import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Comment: {
    isMine: ({ userId }, _, { loggedInUser, client }) =>
      loggedInUser ? userId === loggedInUser.id : false,
    photo: ({ photoId }, _, { client }) =>
      client.photo.findUnique({
        where: {
          id: photoId,
        },
      }),
  },
};

export default resolvers;
