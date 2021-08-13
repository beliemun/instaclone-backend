import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seePhotoLikes(id: Int!, offset: Int!, take: Int!): [User!]
  }
`;
