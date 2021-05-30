import { gql } from "apollo-server-core";

export default gql`
  type SeeFollwingsResult {
    ok: Boolean!
    error: String
    followings: [User]
  }

  type Query {
    seeFollowings(userName: String!, lastId: Int): SeeFollwingsResult
  }
`;
