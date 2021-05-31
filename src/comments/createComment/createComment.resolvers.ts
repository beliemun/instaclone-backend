import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolver: Resolver = async (
  _,
  { photoId, text },
  { loggedInUser, client }
) => {
  const ok = await client.photo.findUnique({
    where: {
      id: photoId,
    },
    select: {
      id: true,
    },
  });
  if (!ok) {
    return {
      ok: false,
      error: "Photo not found.",
    };
  }
  await client.comment.create({
    data: {
      text,
      photo: {
        connect: {
          id: photoId,
        },
      },
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
    },
  });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    createComment: protectedResolver(resolver),
  },
};
