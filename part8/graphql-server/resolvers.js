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
    allAuthors: async () => {
      const authors = await Author.find();

      const authorsWithBookCount = authors.map((a) => {
        return {
          id: a._id,
          name: a.name,
          born: a.born,
          bookCount: a.books.length,
        };
      });

      return authorsWithBookCount;
    },
    me: (root, args, context) => {
      return context.currentUser;
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
      const author = existingAuthor || new Author({ name: args.author });

      if (!existingAuthor) {
        try {
          await author.save();
        } catch (error) {
          console.log(error);
          throw new GraphQLError("Saving new author failed", {
            extensions: {
              error,
            },
          });
        }
      }

      const book = new Book({
        ...args,
        author: author._id,
      });

      author.books.push(book._id);
      await author.save();

      try {
        await book.save();
      } catch (error) {
        console.log(error);

        if (author.books.length === 1) {
          await Author.deleteOne({ _id: author._id });
        } else {
          author.books = author.books.filter((b) => b._id !== book._id);
          await author.save();
        }

        throw new GraphQLError("Saving book failed - Title too short", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }

      const graphqlBook = {
        title: book.title,
        published: book.published,
        genres: book.genres,
        id: book._id.toString(),
        author: author.toObject(),
      };

      pubsub.publish("BOOK_ADDED", { bookAdded: graphqlBook });

      return graphqlBook;
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
