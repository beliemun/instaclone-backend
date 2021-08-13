import { gql } from "apollo-server-core";

export default gql`
  # type SeeFollowingResult {
  #   ok: Boolean!
  #   error: String
  #   following:
  # }

  type Query {
    seeFollowing(userName: String!, offset: Int!, take: Int!): [User!]
  }
`;
