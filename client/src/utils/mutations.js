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

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const ADD_ACTIVITY = gql`
  mutation addActivity($type: String!) {
    addActivity(type: $type) {
      _id
      type
      caloricValue
      details
      createdAt
      username
    }
  }
`;

export const ADD_FOOD = gql`
  mutation addFood($type: String!) {
    addFood(type: $type) {
      _id
      type
      caloricValue
      details
      createdAt
      username
    }
  }
`;