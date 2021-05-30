require("dotenv").config();

import * as express from "express";
import * as logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getLoggedInUser, protectedResolver } from "./users/users.utils";
import client from "./client";

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    loggedInUser: await getLoggedInUser(req.headers.token),
    client,
    protectedResolver,
  }),
});

const PORT = process.env.PORT;

const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));
app.listen({ port: PORT }, () =>
  console.log(`🚀 Server is runing on http://localhost:${PORT}/`)
);
