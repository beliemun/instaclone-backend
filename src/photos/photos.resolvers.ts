import { Resolvers } from "../types";
import { protectedResolver } from "../users/users.utils";

const totoalPhotosResolver = async ({ id }, {}, { loggedInUser, client }) =>
  client.photo.count({ where: { hashtags: { some: { id } } } });

const resolvers: Resolvers = {
  Photo: {
    user: ({ userId }, _, { client }) =>
      client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }, _, { client }) =>
      client.hashtag.findMany({
        where: { photos: { some: { id } } },
        include: { photos: true },
      }),
    likeCount: ({ id }, _, { client }) =>
      client.like.count({ where: { photoId: id } }),
    comments: ({ id }, _, { client }) =>
      client.comment.findMany({
        where: {
          photoId: id,
        },
        include: {
          user: true,
        },
      }),
    commentCount: ({ id }, _, { client }) =>
      client.comment.count({ where: { photoId: id } }),
    isMine: ({ userId }, _, { loggedInUser, client }) =>
      loggedInUser ? userId === loggedInUser.id : false,
    isLiked: async ({ id }, _, { loggedInUser, client }) => {
      if (!loggedInUser) {
        return false;
      }
      const ok = await client.like.findUnique({
        where: {
          photoId_userId: {
            photoId: id,
            userId: loggedInUser.id,
          },
        },
        select: {
          id: true,
        },
      });
      return ok ? true : false;
    },
  },
  Hashtag: {
    // 필드에 작성된 args를 사용할 수 있다.
    photos: ({ id }, { page }, { client }) => {
      return client.hashtag.findUnique({ where: { id } }).photos();
    },
    // 부분 적으로 프로젝트를 해줄 수 있다.
    totalPhotos: protectedResolver(totoalPhotosResolver),
  },
};

export default resolvers;
