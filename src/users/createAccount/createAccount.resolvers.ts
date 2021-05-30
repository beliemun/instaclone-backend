import * as bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _: any,
      { firstName, lastName, userName, email, password },
      { client }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ userName }, { email }],
          },
        });
        if (existingUser) {
          throw new Error();
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        return client.user
          .create({
            data: {
              userName,
              email,
              firstName,
              lastName,
              password: hashedPassword,
            },
          })
          .then(() => ({ ok: true }));
      } catch (e) {
        return {
          ok: false,
          error: "This username is already taken!",
        };
      }
    },
  },
};

export default resolvers;
