import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setNotification } from "../../reducers/notificationReducer";
import { deleteBlog, likeBlog } from "../../reducers/blogReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user);

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

  if (!blog) {
    return null;
  }

  return (
    <div>
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
    </div>
  );
};

export default Blog;
