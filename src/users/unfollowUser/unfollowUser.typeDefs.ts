import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    unfollowUser(userName: String!): MutationResponse
  }
`;
