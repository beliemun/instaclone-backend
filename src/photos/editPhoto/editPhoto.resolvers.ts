import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utility";

const resolver: Resolver = async (
  _,
  { id, caption },
  { loggedInUser, client }
) => {
  const target = await client.photo.findUnique({
    where: { id },
    include: { hashtags: { select: { hashtag: true } } },
  });
  if (target.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "Photo not found.",
    };
  }
  await client.photo.update({
    where: { id },
    data: {
      caption,
      hashtags: {
        disconnect: target.hashtags,
        connectOrCreate: processHashtags(caption),
      },
    },
  });
  return {
    ok: true,
  };
};
export default {
  Mutation: {
    editPhoto: protectedResolver(resolver),
  },
};
