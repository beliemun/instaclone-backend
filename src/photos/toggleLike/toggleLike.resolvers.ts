import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolver: Resolver = async (_, { id }, { loggedInUser, client }) => {
  const exsitingPhoto = await client.photo.findUnique({ where: { id } });
  if (!exsitingPhoto) {
    return {
      ok: false,
      error: "Photo not found.",
    };
  }
  const likeWhere = {
    photoId_userId: { userId: loggedInUser.id, photoId: id },
  };
  const like = await client.like.findUnique({
    where: likeWhere,
  });
  if (like) {
    await client.like.delete({
      where: likeWhere,
    });
  } else {
    await client.like.create({
      data: {
        user: { connect: { id: loggedInUser.id } },
        photo: { connect: { id: exsitingPhoto.id } },
      },
    });
  }
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    toggleLike: protectedResolver(resolver),
  },
};
