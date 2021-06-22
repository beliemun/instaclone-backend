import { gql } from "apollo-server-core";

export default gql`
  type SeeFollwingsResult {
    ok: Boolean!
    error: String
    following: [User]
  }

  type Query {
    seefollowing(userName: String!, lastId: Int): SeeFollwingsResult
  }
`;
