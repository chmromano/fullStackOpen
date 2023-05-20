import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs);

  return (
    <>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Link key={blog.id} to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      ))}
    </>
  );
};

export default BlogList;
