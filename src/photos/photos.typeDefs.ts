import { gql } from "apollo-server-core";

export default gql`
  type Photo {
    id: Int!
    user: User!
    file: String!
    caption: String
    hashtags: [Hashtag]
    createdAt: String!
    updatedAt: String!
    likeCount: Int!
    comments: [Comment]
    commentCount: Int!
    isMine: Boolean!
    isLiked: Boolean!
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    photos: [Photo] #필드에도 agrs를 작성할 수 있다. 원래 > photos(page: Int!): [Photo]
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }
`;
