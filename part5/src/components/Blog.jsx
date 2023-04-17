import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    paddingLeft: 2,
    paddingTop: 10,
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Hide" : "View"}
      </button>
      <div style={{ display: visible ? "" : "none" }}>
        {blog.url}
        <br />
        {blog.likes} <button>Like</button>
        <br />
        {blog.user.username}
      </div>
    </div>
  );
};

export default Blog;
