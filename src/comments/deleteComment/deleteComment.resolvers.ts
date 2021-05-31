import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolver: Resolver = async (_, { id }, { loggedInUser, client }) => {
  const comment = await client.comment.findUnique({
    where: {
      id,
    },
  });
  if (!comment) {
    return {
      ok: false,
      error: "Comment not found.",
    };
  } else if (comment.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "Not Authorized.",
    };
  } else {
    await client.comment.delete({
      where: {
        id,
      },
    });
    return {
      ok: true,
    };
  }
};

export default {
  Mutation: {
    deleteComment: protectedResolver(resolver),
  },
};
