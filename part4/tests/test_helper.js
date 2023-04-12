const Blog = require("../models/blog");
const User = require("../models/user");

const emptyList = [];

const listWithOneBlog = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

const listWithMultipleBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 12,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

const listWithOneUser = [
  {
    username: "luke",
    name: "Luke Skywalker",
    passwordHash: "ewr43tsdg",
  },
];

const listWithMultipleUsers = [
  {
    username: "luke",
    name: "Luke Skywalker",
    passwordHash: "ewr43tsdg",
  },
  {
    username: "ben",
    name: "Obi-Wan Kenobi",
    passwordHash: "098sdfsdf",
  },
  {
    username: "chewie",
    name: "Chewbacca",
    passwordHash: "43oihiu",
  },
  {
    username: "ani",
    name: "Anakin Skywalker",
    passwordHash: "sd9fh87rfr",
  },
  {
    username: "mando",
    name: "Din Djarin",
    passwordHash: "093r4ifdswo",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs;
};

const usersInDb = async () => {
  const users = await User.find({});
  return users;
};

module.exports = {
  emptyList,
  listWithOneBlog,
  listWithMultipleBlogs,
  listWithOneUser,
  listWithMultipleUsers,
  blogsInDb,
  usersInDb,
};
