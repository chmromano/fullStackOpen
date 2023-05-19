import React from "react";
import PropTypes from "prop-types";
import Togglable from "./Togglable";
import useField from "../hooks/useField";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user);

  const { reset: resetTitle, ...title } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetUrl, ...url } = useField("text");

  const resetForm = () => {
    resetTitle();
    resetAuthor();
    resetUrl();
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();

    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };

    try {
      dispatch(createBlog(blog, user));

      blogFormRef.current.toggleVisibility();

      dispatch(
        setNotification(
          {
            error: false,
            text: `Successfully added blog "${blog.title}" by ${blog.author}`,
          },
          5000
        )
      );
    } catch (error) {
      dispatch(
        setNotification({ error: true, text: "Something went wrong" }, 5000)
      );
    }

    resetForm();
  };

  const handleReset = (event) => {
    event.preventDefault();
    resetForm();
  };

  return (
    <Togglable label="Add blog" ref={blogFormRef}>
      <h2>Create new blog</h2>
      <form onSubmit={handleCreateBlog}>
        Title:
        <br />
        <input {...title} />
        <br />
        Author:
        <br />
        <input {...author} />
        <br />
        Url:
        <br />
        <input {...url} />
        <br />
        <button type="submit">Create</button>
        <button onClick={handleReset}>Reset</button>
      </form>
    </Togglable>
  );
};

BlogForm.propTypes = {
  blogFormRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    .isRequired,
};

export default BlogForm;
