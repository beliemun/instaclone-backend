import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seePhotoComments(id: Int!, offset: Int!, take: Int!): [Comment!]
  }
`;
