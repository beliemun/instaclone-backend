import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    uploadPhoto(file: Upload!, caption: String): Photo
  }
`;
