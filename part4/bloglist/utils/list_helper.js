const collection = require("lodash/collection");

/* eslint-disable-next-line no-unused-vars */
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const favourite = blogs.reduce((previous, current) => {
    return previous.likes > current.likes ? previous : current;
  }, {});

  delete favourite._id;
  delete favourite.url;
  delete favourite.__v;

  return favourite;
};

const mostBlogs = (blogs) => {
  const countByAuthor = collection.countBy(blogs, "author");
  const objectToArray = Object.entries(countByAuthor);
  const result = objectToArray.reduce((previous, current) => {
    return previous[1] > current[1]
      ? { author: previous[0], blogs: previous[1] }
      : { author: current[0], blogs: current[1] };
  }, {});
  return result;
};

const mostLikes = (blogs) => {
  const groupByAuthor = collection.groupBy(blogs, "author");
  const objectToArray = Object.entries(groupByAuthor);
  const mappedArray = objectToArray.map((listItem) => {
    return {
      author: listItem[0],
      likes: totalLikes(listItem[1]),
    };
  });
  const result = mappedArray.reduce((previous, current) => {
    return previous.likes > current.likes ? previous : current;
  }, {});

  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

const list = [
  [
    "Michael Chan",
    [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
    ],
  ],
  [
    "Edsger W. Dijkstra",
    [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
      },
    ],
  ],
  [
    "Robert C. Martin",
    [
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0,
      },
      {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        likes: 12,
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0,
      },
    ],
  ],
];
