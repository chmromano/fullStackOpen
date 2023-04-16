const mongoose = require("mongoose");

const Blog = require("../models/blog");
const User = require("../models/user");

const emptyList = [];

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    author: "Edsger W. Dijkstra",
    likes: 5,
    title: "Go To Statement Considered Harmful",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    user: new mongoose.mongo.ObjectId("643a80a86c601719a737d96d"),
  },
];

const listWithMultipleBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    author: "Michael Chan",
    likes: 7,
    title: "React patterns",
    url: "https://reactpatterns.com/",
    user: new mongoose.mongo.ObjectId("643a80a86c601719a737d96d"),
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    author: "Edsger W. Dijkstra",
    likes: 5,
    title: "Go To Statement Considered Harmful",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    user: new mongoose.mongo.ObjectId("643a80cd796a12a0bd4bddcd"),
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    author: "Edsger W. Dijkstra",
    likes: 12,
    title: "Canonical string reduction",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    user: new mongoose.mongo.ObjectId("643a80d89356f9401c1deec6"),
  },
  {
    _id: "5a422b891b54a676234d17fa",
    author: "Robert C. Martin",
    likes: 10,
    title: "First class tests",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    author: "Robert C. Martin",
    likes: 12,
    title: "TDD harms architecture",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    user: new mongoose.mongo.ObjectId("643a80a86c601719a737d96d"),
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    author: "Robert C. Martin",
    likes: 2,
    title: "Type wars",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    user: new mongoose.mongo.ObjectId("643a80f28b263664b3848102"),
  },
];

const listWithOneUser = [
  {
    _id: "643a80a86c601719a737d96d",
    blogs: [
      new mongoose.mongo.ObjectId("5a422a851b54a676234d17f7"),
      new mongoose.mongo.ObjectId("5a422ba71b54a676234d17fb"),
    ],
    name: "Luke Skywalker",
    passwordHash: "ewr43tsdg",
    username: "luke",
  },
];

const listWithMultipleUsers = [
  {
    _id: "643a80a86c601719a737d96d",
    blogs: [
      new mongoose.mongo.ObjectId("5a422a851b54a676234d17f7"),
      new mongoose.mongo.ObjectId("5a422ba71b54a676234d17fb"),
    ],
    name: "Luke Skywalker",
    passwordHash: "ewr43tsdg",
    username: "luke",
  },
  {
    _id: "643a80cd796a12a0bd4bddcd",
    blogs: [new mongoose.mongo.ObjectId("5a422aa71b54a676234d17f8")],
    name: "Obi-Wan Kenobi",
    passwordHash: "098sdfsdf",
    username: "ben",
  },
  {
    _id: "643a80d89356f9401c1deec6",
    blogs: [new mongoose.mongo.ObjectId("5a422b3a1b54a676234d17f9")],
    name: "Chewbacca",
    passwordHash: "43oihiu",
    username: "chewie",
  },
  {
    _id: "643a80e76224c58697785cf4",
    blogs: [],
    name: "Anakin Skywalker",
    passwordHash: "sd9fh87rfr",
    username: "ani",
  },
  {
    _id: "643a80f28b263664b3848102",
    blogs: [new mongoose.mongo.ObjectId("5a422bc61b54a676234d17fc")],
    name: "Din Djarin",
    passwordHash: "093r4ifdswo",
    username: "mando",
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
  blogsInDb,
  emptyList,
  listWithMultipleBlogs,
  listWithMultipleUsers,
  listWithOneBlog,
  listWithOneUser,
  usersInDb,
};
