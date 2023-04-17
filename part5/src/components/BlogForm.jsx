import React, { useState } from "react";
import blogService from "./../services/blogs";

const BlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();

    const blogObject = {
      author,
      title,
      url,
    };

    const returnedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(returnedBlog));
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <label htmlFor="title">Title:</label>
      <br />
      <input
        type="text"
        value={title}
        name="Title"
        id="title"
        onChange={({ target }) => setTitle(target.value)}
      />
      <br />
      <label htmlFor="author">Author:</label>
      <br />
      <input
        type="text"
        value={author}
        name="Author"
        id="author"
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br />
      <label htmlFor="url">Url:</label>
      <br />
      <input
        type="text"
        value={url}
        name="Url"
        id="utl"
        onChange={({ target }) => setUrl(target.value)}
      />
      <br />
      <button type="submit">Create</button>
    </form>
  );
};

export default BlogForm;
