import { gql } from "apollo-server-core";

export default gql`
  type Subscription {
    newMessageUpdate(id: Int!): Message
  }
`;
