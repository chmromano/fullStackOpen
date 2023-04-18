import React, { useState } from "react";
import PropTypes from "prop-types";
import Togglable from "./Togglable";

const BlogForm = ({ createBlog, blogFormRef }) => {
  const emptyBlog = { author: "", title: "", url: "" };

  const [blog, setBlog] = useState(emptyBlog);

  const addBlog = async (event) => {
    event.preventDefault();

    createBlog(blog);

    setBlog(emptyBlog);
  };

  return (
    <Togglable label="Add blog" ref={blogFormRef}>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          value={blog.title}
          name="Title"
          id="title"
          onChange={({ target }) => setBlog({ ...blog, title: target.value })}
        />
        <br />
        <label htmlFor="author">Author:</label>
        <br />
        <input
          type="text"
          value={blog.author}
          name="Author"
          id="author"
          onChange={({ target }) => setBlog({ ...blog, author: target.value })}
        />
        <br />
        <label htmlFor="url">Url:</label>
        <br />
        <input
          type="text"
          value={blog.url}
          name="Url"
          id="utl"
          onChange={({ target }) => setBlog({ ...blog, url: target.value })}
        />
        <br />
        <button type="submit">Create</button>
      </form>
    </Togglable>
  );
};

BlogForm.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setBlogs: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default BlogForm;
