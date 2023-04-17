import Blog from "./Blog";
import PropTypes from "prop-types";
import React from "react";

const BlogList = ({ user, blogs, setBlogs, setMessage }) => {
  return (
    <>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          setMessage={setMessage}
        />
      ))}
    </>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setBlogs: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default BlogList;
