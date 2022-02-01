import { gql } from 'graphql-request';

/**
 * Authentication Mutations
 */
export const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      email
      fullname
    }
  }
`;

export const logoutMutation = gql`
  mutation logout {
    logout
  }
`;
