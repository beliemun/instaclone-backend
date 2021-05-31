import { gql } from "apollo-server-core";

export default gql`
  type toggleLikeResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    toggleLike(id: Int!): toggleLikeResult!
  }
`;
