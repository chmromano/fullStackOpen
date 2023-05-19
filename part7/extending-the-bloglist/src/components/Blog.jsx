import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user);

  const [visible, setVisible] = useState(false);

  const handleDeleteBlog = async () => {
    try {
      if (
        window.confirm(`Deleting "${blog.title}" by ${blog.author}. Confirm?`)
      ) {
        dispatch(deleteBlog(blog.id));

        dispatch(
          setNotification(
            {
              error: false,
              text: `Blog "${blog.title}" deleted`,
            },
            5000
          )
        );
      }
    } catch (error) {
      dispatch(
        setNotification({ error: true, text: "Something went wrong" }, 5000)
      );
    }
  };

  const handleLikeBlog = async () => {
    try {
      dispatch(likeBlog(blog));

      dispatch(
        setNotification(
          {
            error: false,
            text: `Liked blog "${blog.title}" by ${blog.author}`,
          },
          5000
        )
      );
    } catch (error) {
      dispatch(
        setNotification({ error: true, text: "Something went wrong" }, 5000)
      );
    }
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
          <button className="blogLikeButton" onClick={handleLikeBlog}>
            Like
          </button>
          <br />
          {blog.user.username}
          <br />
          {user.username === blog.user.username ? (
            <button id="blogDeleteButton" onClick={handleDeleteBlog}>
              Delete
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
