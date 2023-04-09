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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
