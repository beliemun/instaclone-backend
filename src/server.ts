require("dotenv").config();

import * as express from "express";
import * as logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getLoggedInUser, protectedResolver } from "./users/users.utils";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    loggedInUser: await getLoggedInUser(req.headers.token),
    protectedResolver,
  }),
});

const PORT = process.env.PORT;

const app = express();
app.use(logger("tiny"));
server.applyMiddleware({ app });
app.listen({ port: PORT }, () =>
  console.log(`🚀 Server is runing on http://localhost:${PORT}/`)
);
