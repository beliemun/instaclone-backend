import { gql } from "apollo-server-core";

export default gql`
  type Subscription {
    readMessageUpdate(id: Int!): Room
  }
`;
