import { gql } from '@apollo/client';

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