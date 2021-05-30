import { Resolver } from "../../types";
import { protectedResolver } from "../users.utils";

const resolver: Resolver = async (
  _: any,
  { userName },
  { loggedInUser, client }
) => {
  const existingUser = await client.user.findUnique({
    where: { userName },
    select: { id: true },
  });
  if (!existingUser) {
    return {
      ok: false,
      error: "That user does not exist.",
    };
  } else if (existingUser.id === loggedInUser.id) {
    return {
      ok: false,
      error: "Can not follow yourself.",
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
    followUser: protectedResolver(resolver),
  },
};
