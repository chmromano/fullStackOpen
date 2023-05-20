import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { setNotification } from "../../reducers/notificationReducer";
import { commentBlog, deleteBlog, likeBlog } from "../../reducers/blogReducer";
import useField from "../../hooks/useField";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { reset: resetComment, ...comment } = useField("text");

  const user = useSelector(({ user }) => user);

  const handleDeleteBlog = async () => {
    const promptString = `Deleting "${blog.title}" by ${blog.author}. Confirm?`;

    if (window.confirm(promptString)) {
      dispatch(deleteBlog(blog.id));

      const notification = {
        error: false,
        text: `Blog "${blog.title}" deleted`,
      };

      dispatch(setNotification(notification, 5000));

      navigate("/");
    }
  };

  const handleLikeBlog = async () => {
    dispatch(likeBlog(blog));

    const notification = {
      error: false,
      text: `Liked blog "${blog.title}" by ${blog.author}`,
    };

    dispatch(setNotification(notification, 5000));
  };

  const handleCommentBlog = async (event) => {
    event.preventDefault();

    if (comment.value === "") {
      const notification = {
        error: true,
        text: "Comment cannot be empty",
      };
      dispatch(setNotification(notification, 5000));
    } else {
      dispatch(commentBlog(blog.id, comment.value));

      const notification = {
        error: false,
        text: `Commented blog "${blog.title}" by ${blog.author}`,
      };
      dispatch(setNotification(notification, 5000));

      resetComment();
    }
  };

  if (!blog) {
    return null;
  }

  console.log(blog);

  return (
    <>
      <h2>
        {blog.title} {blog.author}
      </h2>

      <div>
        <a href={blog.url} rel="noreferrer" target="_blank">
          {blog.url}
        </a>
        <br />
        <span>{`${blog.likes} like${blog.likes === 1 ? "" : "s"}`}</span>
        <button onClick={handleLikeBlog}>Like</button>
        <br />
        {`Added by ${blog.user.username}`}
        <br />
        {user.username === blog.user.username ? (
          <button onClick={handleDeleteBlog}>Delete</button>
        ) : null}
      </div>

      <br />

      <form onSubmit={handleCommentBlog}>
        Comment:
        <input {...comment} />
        <button type="submit">Comment</button>
        <button onClick={resetComment}>Reset</button>
      </form>

      <h3>Comments:</h3>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </>
  );
};

export default Blog;
