import Blog from "./Blog";
import React from "react";

const BlogList = ({ blogs, setMessage }) => {
  return (
    <>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} setMessage={setMessage} />
      ))}
    </>
  );
};

export default BlogList;
