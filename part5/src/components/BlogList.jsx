import Blog from "./Blog";
import React from "react";

const BlogList = ({ user, blogs, setBlogs, setMessage }) => {
  return (
    <>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          setMessage={setMessage}
        />
      ))}
    </>
  );
};

export default BlogList;
