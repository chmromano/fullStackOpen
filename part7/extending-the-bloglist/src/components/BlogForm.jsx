import React from "react";
import PropTypes from "prop-types";
import Togglable from "./Togglable";
import useField from "../hooks/useField";

const BlogForm = ({ onCreate, blogFormRef }) => {
  const { reset: resetTitle, ...title } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetUrl, ...url } = useField("text");

  const resetForm = () => {
    resetTitle();
    resetAuthor();
    resetUrl();
  };

  const addBlog = (event) => {
    event.preventDefault();

    onCreate({
      title: title.value,
      author: author.value,
      url: url.value,
    });

    resetForm();
  };

  const handleReset = (event) => {
    event.preventDefault();
    resetForm();
  };

  return (
    <Togglable label="Add blog" ref={blogFormRef}>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
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
  onCreate: PropTypes.func.isRequired,
};

export default BlogForm;
