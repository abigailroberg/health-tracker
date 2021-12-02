import gql from 'graphql-tag';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      activities {
        _id
        type
        caloricValue
        createdAt
        details
      }
      foods {
        _id
        type
        caloricValue
        createdAt
        details
      }
    }
  }
`

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      activities {
        _id
        type
        caloricValue
        createdAt
        details
      }
      foods {
        _id
        type
        caloricValue
        createdAt
        details
      }
    }
  }
`

export const QUERY_ACTIVITIES = gql`
  query activities($username: String) {
    activities(username: $username) {
      _id
      type
      caloricValue
      details
      createdAt
      user {
        username
      }
    }
  }
`;

export const QUERY_FOODS = gql`
  query foods($username: String) {
    foods(username: $username) {
      _id
      type
      caloricValue
      details
      createdAt
      user {
        username
      }
    }
  }
`;

export const QUERY_ACTIVITY = gql`
  query activity($id: ID!) {
    activity(_id: $id) {
      _id
      type
      caloricValue
      createdAt
      user {
        username
      }
    }
  }
`;

export const QUERY_FOOD = gql`
  query food($id: ID!) {
    food(_id: $id) {
      _id
      type
      caloricValue
      createdAt
      user {
        username
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;
