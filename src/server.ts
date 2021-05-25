require("dotenv").config();

import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { getLoggedInUser, protectResolver } from "./users/users.utils";

const server = new ApolloServer({
  schema,
  context: async ({ req }) => ({
    loggedInUser: await getLoggedInUser(req.headers.token),
    protectResolver,
  }),
});

const PORT = process.env.PORT;

server
  .listen()
  .then(() => console.log(`Server is runing on http://localhost:${PORT}/`));
