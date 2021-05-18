import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import client from "../../client";
import { IVerifiedToken } from "../../types";

export default {
  Mutation: {
    editProfile: async (
      _: any,
      { firstName, lastName, userName, email, password, token }
    ) => {
      const { id } = jwt.verify(
        token,
        process.env.SECRET_KEY
      ) as IVerifiedToken;

      let hashedPassword = null;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }
      const updatedUser = await client.user.update({
        where: {
          id,
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
    },
  },
};
