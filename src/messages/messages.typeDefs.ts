import { gql } from "apollo-server-core";

export default gql`
  type Message {
    id: Int!
    text: String!
    user: User!
    room: Room!
    read: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type Room {
    id: Int!
    users: [User]
    unreadTotal: Int!
    messages: [Message]
    createdAt: String!
    updatedAt: String!
  }
`;
