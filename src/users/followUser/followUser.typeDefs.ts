import { gql } from "apollo-server-core";

export default gql`
  type FollowerUserResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    followUser(userName: String): FollowerUserResult
  }
`;
