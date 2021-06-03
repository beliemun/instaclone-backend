import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    sendMessage(text: String!, roomId: Int, userId: Int): MutationResponse!
  }
`;
