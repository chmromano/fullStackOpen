import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import "dotenv/config";

import initialiseDatabase from "./database_initialisation.js";

import Author from "./models/author.js";
import Book from "./models/book.js";
import User from "./models/user.js";

mongoose.set("strictQuery", false);

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(initialiseDatabase())
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = /* GraphQL */ `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (root, args) => {
      const { author, genre } = args;
      const query = {};

      if (author) {
        const foundAuthor = await Author.findOne({ name: author });
        query.author = foundAuthor._id;
      }

      if (genre) {
        query.genres = genre;
      }

      return Book.find(query).populate("author", { name: 1, born: 1 });
    },
    allAuthors: async () => Author.find(),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Author: {
    bookCount: async (root) => {
      const { name } = root;

      const author = await Author.findOne({ name });

      return Book.countDocuments({ author: author._id });
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const existingAuthor = await Author.findOne({ name: args.author });

      const author =
        existingAuthor ||
        (await (async () => {
          const newAuthor = new Author({ name: args.author });

          try {
            await newAuthor.save();
            return newAuthor;
          } catch (error) {
            console.log(error);
            throw new GraphQLError("Saving author failed - Name too short", {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.author,
                error,
              },
            });
          }
        })());

      const book = new Book({ ...args, author });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Saving book failed - Title too short", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }

      return book;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const { name, setBornTo } = args;

      const author = await Author.findOneAndUpdate(
        { name },
        { born: setBornTo }
      );

      if (!author) {
        return null;
      }

      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: { name: args.name, favoriteGenre: args.favoriteGenre },
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
