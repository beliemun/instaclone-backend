import client from "../../client";
import { protectedResolver } from "../users.utils";

const resolverFn = async (_: any, { userName }, { loggedInUser }) => {
  const existingUser = await client.user.findUnique({
    where: { userName },
    select: { id: true },
  });
  if (!existingUser) {
    return {
      ok: false,
      error: "That user does not exist.",
    };
  }
  await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      followings: {
        connect: {
          userName,
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
    followUser: protectedResolver(resolverFn),
  },
};
