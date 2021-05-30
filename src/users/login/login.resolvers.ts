import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_: any, { userName, password }, { client }) => {
      const user = await client.user.findFirst({
        where: { userName },
        select: { id: true, password: true },
      });
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

export default resolvers;
