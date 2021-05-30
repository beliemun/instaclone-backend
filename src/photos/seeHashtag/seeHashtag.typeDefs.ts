import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeHashtag(hashtag: String!): Hashtag
  }
`;
