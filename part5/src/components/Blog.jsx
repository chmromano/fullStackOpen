import React, { useState } from "react";
import PropTypes from "prop-types";
import blogService from "./../services/blogs";

const Blog = ({ user, blog, blogs, setBlogs, setMessage }) => {
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
    } catch (error) {
      setMessage({ error: true, text: "Something went wrong" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const deleteBlog = async () => {
    try {
      if (
        window.confirm(
          `Deleting "${statefulBlog.title}" by ${statefulBlog.author}. Confirm?`
        )
      ) {
        const idToRemove = statefulBlog.id;

        await blogService.remove(statefulBlog.id);

        setBlogs(blogs.filter((blog) => blog.id !== idToRemove));

        setMessage({
          error: false,
          text: `Blog "${statefulBlog.title}" deleted`,
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    } catch (error) {
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
      {visible ? (
        <div className="hiddenPartOfBlog">
          <span className="blogUrl">{statefulBlog.url}</span>
          <br />
          <span className="blogLikes">{statefulBlog.likes}</span>
          <button onClick={updateLikes}>Like</button>
          <br />
          {statefulBlog.user.username}
          <br />
          {user.username === statefulBlog.user.username ? (
            <button onClick={deleteBlog}>Delete</button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setBlogs: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
