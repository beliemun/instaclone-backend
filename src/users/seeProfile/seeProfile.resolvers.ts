import client from "../../client";

export default {
  Query: {
    seeProfile: (_: any, { userName }) =>
      client.user.findUnique({
        where: { userName },
        include: { followings: true, followers: true },
      }),
  },
};
