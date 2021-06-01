import { uploadToS3 } from "../../shared/shared.utils";
import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utility";

const resolver: Resolver = async (
  _: any,
  { file, caption },
  { loggedInUser, client }
) => {
  let hashtagsObj = [];
  if (caption) {
    hashtagsObj = processHashtags(caption);
  }
  const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
  return client.photo.create({
    data: {
      file: fileUrl,
      caption,
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
      ...(hashtagsObj.length > 0 && {
        hashtags: {
          connectOrCreate: hashtagsObj,
        },
      }),
    },
  });
};

export default {
  Mutation: {
    uploadPhoto: protectedResolver(resolver),
  },
};
