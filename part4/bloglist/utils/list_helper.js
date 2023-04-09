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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
