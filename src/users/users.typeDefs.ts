import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: String!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    bio: String
    avatar: String
    createdAt: String!
    updatedAt: String!
  }
`;
