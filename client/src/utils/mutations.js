import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`

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
`

export const SAVE_BOOK = gql`
  mutation login($input: saveBook!) {
    addBook(input: $input) {
      _id
      username
      email
      bookCount
      savedBooks{
        _id
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`