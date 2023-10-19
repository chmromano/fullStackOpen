import { gql } from "@apollo/client";

import { AUTHOR_DETAILS, BOOK_DETAILS, USER_DETAILS } from "./fragments";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

export const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const ME = gql`
  query {
    me {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;
