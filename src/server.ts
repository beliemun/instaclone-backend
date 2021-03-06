// DATABASE_URL="postgresql://postgres:randompassword@localhost:5432/instaclone?schema=public"

require("dotenv").config();
import express from "express";
import logger from "morgan";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getLoggedInUser, protectedResolver } from "./users/users.utils";
import client from "./client";

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  // [중요] playground와 introspection은 실제 개발할 때 필요 없으니 꺼야한다.
  // 켜져있을 경우 제 3자가 playground를 통해 backend를 들여다 볼 수 있게 된다.
  playground: true, // production 상태에서는 playground가 자동 비활성화 되어 > true
  introspection: true, // production 상태에서 Apollo server에서 playground 반영이 허락되지 않아 > true
  context: async (context) => {
    // 웹소켓 프로토콜(ws://)에는 context가 없다.
    // {req}로 하지 않고, context로 두는 이유는 Http context 또는 websocket context가 될 수 있기 때문이다.
    if (context.req) {
      return {
        loggedInUser: await getLoggedInUser(
          context.req.headers.token as string
        ),
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
