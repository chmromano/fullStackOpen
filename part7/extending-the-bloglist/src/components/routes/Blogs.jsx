import React from "react";
import BlogForm from "../BlogForm";
import BlogList from "../BlogList";

const Blogs = ({ blogFormRef }) => (
  <>
    <BlogForm blogFormRef={blogFormRef} />
    <BlogList />
  </>
);

export default Blogs;
