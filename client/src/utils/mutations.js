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
  mutation addActivity($type: String!, $caloricValue: Int!, $details: String) {
    addActivity(type: $type, caloricValue: $caloricValue, details: $details) {
      _id
      type
      caloricValue
      details
      createdAt
    }
  }
`;

export const ADD_FOOD = gql`
  mutation addFood($type: String!, $caloricValue: Int!, $details: String) {
    addFood(type: $type, caloricValue: $caloricValue, details: $details) {
      _id
      type
      caloricValue
      details
      createdAt
    }
  }
`;