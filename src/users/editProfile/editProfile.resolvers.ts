import * as bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import { createWriteStream } from "fs";

const resolverFn = async (
  _: any,
  { firstName, lastName, userName, email, password, bio, avatar },
  { loggedInUser }
) => {
  let hashedPassword = null;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      userName,
      email,
      bio,
      ...(hashedPassword && { password: hashedPassword }),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile.",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
