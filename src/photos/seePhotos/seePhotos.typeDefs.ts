import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seePhotos(userName: String!): [Photo!]
  }
`;
