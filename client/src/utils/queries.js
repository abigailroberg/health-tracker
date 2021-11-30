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
      createdAt
      username
    }
  }
`;