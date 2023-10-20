import mongoose from "mongoose";

import Author from "../models/author.js";
import Book from "../models/book.js";
import User from "../models/user.js";

export const authors = [
  {
    name: "Robert Martin",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
  },
  {
    name: "Sandi Metz", // birthyear not known
  },
];

export const books = [
  {
    title: "Clean Code",
    published: 2008,
    author: { name: "Robert Martin" },
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: { name: "Robert Martin" },
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: { name: "Martin Fowler" },
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: { name: "Joshua Kerievsky" },
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: { name: "Sandi Metz" },
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: { name: "Fyodor Dostoevsky" },
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: { name: "Fyodor Dostoevsky" },
    genres: ["classic", "revolution"],
  },
];

const initialiseDatabase = async () => {
  await Author.deleteMany();
  await Book.deleteMany();
  await User.deleteMany();

  const newUser1 = new User({ username: "mike", favoriteGenre: "patterns" });
  const newUser2 = new User({ username: "john", favoriteGenre: "patterns" });
  await newUser1.save();
  await newUser2.save();

  for (let a of authors) {
    const newAuthor = new Author(a);

    const filteredBooks = books.filter((b) => a.name === b.author.name);

    for (let b of filteredBooks) {
      const newBook = new Book({
        ...b,
        author: new mongoose.Types.ObjectId(newAuthor._id),
      });

      newAuthor.books.push(new mongoose.Types.ObjectId(newBook._id));

      await newBook.save();
    }

    await newAuthor.save();
  }
};

export default initialiseDatabase;
