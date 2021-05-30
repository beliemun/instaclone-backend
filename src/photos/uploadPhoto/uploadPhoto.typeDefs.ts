import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    uploadPhoto(file: String!, caption: String): Photo
  }
`;
