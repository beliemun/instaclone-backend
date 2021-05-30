import { Resolvers } from "../types";
import { protectedResolver } from "../users/users.utils";

const totoalPhotosResolver = async ({ id }, {}, { loggedInUser, client }) =>
  client.photo.count({ where: { hashtags: { some: { id } } } });

const resolvers: Resolvers = {
  Photo: {
    user: ({ userId }, _: any, { client }) =>
      client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }, _: any, { client }) =>
      client.hashtag.findMany({ where: { photos: { some: { id } } } }),
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
