import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    readMessages(roomId: Int!): MutationResponse!
  }
`;
