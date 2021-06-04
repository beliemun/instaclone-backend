import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Resolver } from "../../types";

const resolver: Resolver = async (
  _,
  { text, roomId, userId },
  { loggedInUser, client }
) => {
  let room = null;
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
  pubsub.publish(NEW_MESSAGE, { roomUpdates: { ...message } });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    sendMessage: resolver,
  },
};
