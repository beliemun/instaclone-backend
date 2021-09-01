require("dotenv").config();

import * as express from "express";
import * as logger from "morgan";
import * as http from "http";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getLoggedInUser, protectedResolver } from "./users/users.utils";
import client from "./client";

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (context) => {
    // 웹소켓 프로토콜(ws://)에는 context가 없다.
    // {req}로 하지 않고, context로 두는 이유는 Http context 또는 websocket context가 될 수 있기 때문이다.
    if (context.req) {
      return {
        loggedInUser: await getLoggedInUser(context.req.headers.token),
        client,
        protectedResolver,
      };
    } else {
      const {
        connection: {
          context: { loggedInUser },
        },
      } = context;
      return {
        loggedInUser,
        client,
        protectedResolver,
      };
    }
  },
  subscriptions: {
    // connetionParams는 Http headers이다. conect를 시도할 때, 단 한번 발생한다.
    // ws에서 connect 될 때 http Header를 connectionParams로 전달하기 때문에 ws에서도 http 헤더를 사용할 수 있는 것이다.
    onConnect: async ({ token }: { token?: string }) => {
      if (!token) {
        throw new Error("Token not found.");
      }
      const loggedInUser = await getLoggedInUser(token);
      // connect에서 리턴된 값은 context로 들어간다.
      return {
        loggedInUser,
      };
    },
  },
});

const PORT = process.env.PORT;

const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server is runing on http://localhost:${PORT}/`);
});
