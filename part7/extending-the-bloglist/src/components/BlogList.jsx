import Blog from "./Blog";
import PropTypes from "prop-types";
import React from "react";

const BlogList = ({ user, blogs, onDelete, onLike }) => (
  <>
    <h2>Blogs</h2>
    {blogs.map((blog) => (
      <Blog
        key={blog.id}
        user={user}
        blog={blog}
        onDelete={onDelete}
        onLike={onLike}
      />
    ))}
  </>
);

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default BlogList;
