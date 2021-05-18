import client from "../../client";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: async (_: any, { userName, password }) => {
      const user = await client.user.findFirst({ where: { userName } });
      if (!user) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) {
        return {
          ok: false,
          error: "Incorrect password.",
        };
      }
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
