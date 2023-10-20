import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;
export const REMOVE_THOUGHT = gql`
  mutation removeThought($thoughtId: ID!) {
    removeThought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;


export const ADD_COMMENT = gql`
  mutation AddComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      commentAuthor
      commentText
      createdAt
    }
  }
`;

export const REMOVE_COMMENT = gql`
    mutation RemoveComment($commentId: ID!, $thoughtId: ID!) {
      removeComment(commentId: $commentId, thoughtId: $thoughtId) {
      _id
      commentAuthor
      commentText
      createdAt
    }
  }
`;

export const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: Upload!) {
    uploadImage(file: $file) {
     url
    }
  }
`;

export const ADD_FOLLOW = gql`
mutation AddFollow($userId: ID!) {
  addFollow(userId: $userId) {
    _id
  }
}
`;

export const REMOVE_FOLLOW = gql`
mutation RemoveFollow($userId: ID!) {
  removeFollow(userId: $userId) {
    _id
  }
}
`;

export const ADD_CONTACT = gql`
  mutation addContact($name: String, $email: String, $message: String) {
  addContact(name: $name, email: $email, message: $message) {
    email
    message
    name
  }
}

`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
  deleteUser(userId: $userId) {
   _id
  }
}
`;

export const UPDATE_USER = gql`
mutation updateUser($updateUserId: ID!, $username: String, $email: String, $password: String, $profilepicture: String, $bio: String) {
  updateUser(id: $updateUserId, username: $username, email: $email, password: $password, profilepicture: $profilepicture, bio: $bio) {
    _id
    email
    username
    profilepicture
    bio
  }
}
`;

export const ADD_LIKE = gql`
mutation AddLike($userId: ID!, $commentId: ID, $thoughtId: ID) {
  addLike(userId: $userId, commentId: $commentId, thoughtId: $thoughtId) {
    ... on Thought {
      _id
      createdAt
      thoughtAuthor
      thoughtText
    }
    ... on Comment {
      _id
      commentAuthor
      commentText
      createdAt
    }
  }
}
`

