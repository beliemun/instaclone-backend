import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seePhoto(id: Int!): Photo
  }
`;
