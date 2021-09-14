import { NetworkFirewall } from "aws-sdk";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Resolver } from "../../types";

const resolver: Resolver = async (
  _,
  { text, roomId, userId },
  { loggedInUser, client }
) => {
  let room = null;
  // 채팅방 리스트를 벗어난 위치(대상유저 프로필 화면 등)에서 메시지를 보낼 경우,
  // 메시지와 대상유저 아이디로 sendMessage를 호출한다.
  // 이와 같이 방아이디를 모르는 경우, 유저 아이디로 방을 찾아야한다.
  if (userId) {
    const user = await client.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });
    if (!user) {
      return {
        ok: false,
        error: "This user does not exist.",
      };
    }
    // 1. 유저 아이디로 방이 존재하는지를 먼저 검사한다.
    const existingRoom = await client.room.findFirst({
      where: {
        AND: [
          {
            users: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
          {
            users: {
              some: {
                id: userId,
              },
            },
          },
        ],
      },
    });
    // 2. 방이 존재하면 해당 방을 room에 저장해 놓는다.
    if (existingRoom) {
      room = existingRoom;
    } else {
      room = await client.room.create({
        data: {
          users: {
            connect: [
              {
                id: userId,
              },
              {
                id: loggedInUser.id,
              },
            ],
          },
        },
      });
    }
    // 방 아이디를 알고 있는 경우 해당 방을 room에 저장한다.
  } else if (roomId) {
    room = await client.room.findUnique({
      where: {
        id: roomId,
      },
      select: {
        id: true,
      },
    });
    if (!room) {
      return {
        ok: false,
        error: "Room not found.",
      };
    }
  }
  // 메시지 내용와 발송유저(로그인유저)의 아이디로 메시지를 생성한다.
  const message = await client.message.create({
    data: {
      text,
      room: {
        connect: {
          id: room.id,
        },
      },
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
    },
  });
  await client.room.update({
    where: {
      id: room.id,
    },
    data: {
      updatedAt: new Date(),
    },
  });
  pubsub.publish(NEW_MESSAGE, { newMessageUpdate: { ...message } });
  return {
    ok: true,
    id: room.id,
  };
};

export default {
  Mutation: {
    sendMessage: resolver,
  },
};
