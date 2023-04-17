import React, { useState } from "react";
import blogService from "./../services/blogs";

const Blog = ({ blog, setMessage }) => {
  const [statefulBlog, setStatefulBlog] = useState(blog);
  const [visible, setVisible] = useState(false);

  const updateLikes = async () => {
    try {
      const blogToUpdate = {
        ...statefulBlog,
        likes: statefulBlog.likes + 1,
        user: statefulBlog.user.id,
      };

      delete blogToUpdate.id;

      await blogService.update(statefulBlog.id, blogToUpdate);

      setStatefulBlog({ ...statefulBlog, likes: statefulBlog.likes + 1 });

      setMessage({
        error: false,
        text: `Like added to blog "${statefulBlog.title}"`,
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch {
      setMessage({ error: true, text: "Something went wrong" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div className="blog">
      {statefulBlog.title} {statefulBlog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Hide" : "View"}
      </button>
      <div style={{ display: visible ? "" : "none" }}>
        {statefulBlog.url}
        <br />
        {statefulBlog.likes} <button onClick={updateLikes}>Like</button>
        <br />
        {statefulBlog.user.username}
      </div>
    </div>
  );
};

export default Blog;
