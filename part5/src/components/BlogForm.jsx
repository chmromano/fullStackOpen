import React, { useRef, useState } from "react";
import Togglable from "./Togglable";
import blogService from "./../services/blogs";

const BlogForm = ({ blogs, setBlogs, user, setMessage }) => {
  const [blog, setBlog] = useState({ author: "", title: "", url: "" });

  const blogFormRef = useRef();

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const response = await blogService.create(blog);

      const blogToSave = {
        ...response,
        user: {
          id: response.user,
          name: user.name,
          username: user.username,
        },
      };

      setBlogs(blogs.concat(blogToSave));

      blogFormRef.current.toggleVisibility();

      setMessage({
        error: false,
        text: `Successfully added blog "${blog.title}" by ${blog.author}`,
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);

      setBlog({ author: "", title: "", url: "" });
    } catch {
      setMessage({ error: true, text: "Something went wrong" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
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

export default BlogForm;
