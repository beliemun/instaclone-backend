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
  }
  await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      followings: {
        disconnect: {
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
    unfollowUser: protectedResolver(resolver),
  },
};
