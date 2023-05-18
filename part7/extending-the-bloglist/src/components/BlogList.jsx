import Blog from "./Blog";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

const BlogList = ({ user, onDelete, onLike }) => {
  const blogs = useSelector(({ blogs }) => blogs);

  return (
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
};

BlogList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default BlogList;
