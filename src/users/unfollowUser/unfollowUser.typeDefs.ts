import { gql } from "apollo-server-core";

export default gql`
  type UnfollowerUserResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    unfollowUser(userName: String!): UnfollowerUserResult
  }
`;
