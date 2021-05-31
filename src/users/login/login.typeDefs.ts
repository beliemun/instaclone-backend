import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    login(userName: String!, password: String!): MutationResponse!
  }
`;
