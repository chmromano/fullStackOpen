import React from "react";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <>
      <h2>{user.username}</h2>
      <h3>Added blogs:</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link key={blog.id} to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default User;
