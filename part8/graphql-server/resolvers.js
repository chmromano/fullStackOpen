import { PubSub } from "graphql-subscriptions";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

import Author from "./models/author.js";
import Book from "./models/book.js";
import User from "./models/user.js";

const pubsub = new PubSub();

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
        console.log(error);
        throw new GraphQLError("Saving book failed - Title too short", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

export default resolvers;
