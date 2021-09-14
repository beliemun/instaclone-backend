import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeFeed(offset: Int!, take: Int!): [Photo!]
  }
`;
