import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ user, blog, onDelete, onLike }) => {
  const [visible, setVisible] = useState(false);

  const likeBlog = () => {
    onLike(blog);
  };

  const deleteBlog = () => {
    onDelete(blog);
  };

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <button
        className="blogDetailsButton"
        onClick={() => setVisible(!visible)}
      >
        {visible ? "Hide" : "View"}
      </button>
      {visible ? (
        <div className="hiddenBlogDetails">
          <span className="blogUrl">{blog.url}</span>
          <br />
          <span className="blogLikes">{blog.likes}</span>
          <button className="blogLikeButton" onClick={likeBlog}>
            Like
          </button>
          <br />
          {blog.user.username}
          <br />
          {user.username === blog.user.username ? (
            <button onClick={deleteBlog}>Delete</button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
