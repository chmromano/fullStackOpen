import Blog from "./Blog";
import React from "react";
import { useSelector } from "react-redux";

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs);

  return (
    <>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogList;
