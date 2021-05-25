import * as bcrypt from "bcrypt";
import client from "../../client";
import { protectResolver } from "../users.utils";

const resolverFn = async (
  _: any,
  { firstName, lastName, userName, email, password },
  { loggedInUser, protectResolver }
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
    editProfile: protectResolver(resolverFn),
  },
};
