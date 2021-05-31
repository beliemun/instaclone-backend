import * as e from "express";
import * as jwt from "jsonwebtoken";
import client from "../client";
import { IVerifiedToken, Resolvers, Resolver } from "../types";

export const getLoggedInUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = jwt.verify(token, process.env.SECRET_KEY) as IVerifiedToken;
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const protectedResolver =
  (resolver: Resolver): Resolver =>
  (root, args, context, info) => {
    if (!context.loggedInUser) {
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "Please log in to perform this action.",
        };
      }
    }
    return resolver(root, args, context, info);
  };
