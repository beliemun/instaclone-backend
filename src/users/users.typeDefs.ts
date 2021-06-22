import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    bio: String
    avatar: String
    photos: [Photo]
    followers: [User]
    following: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    totalPhotos: Int!
    isMe: Boolean!
    isFollowing: Boolean!
  }
`;
