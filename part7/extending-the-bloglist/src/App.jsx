import React, { useEffect, useRef } from "react";
import { Routes, Route, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { initializeBlogs } from "./reducers/blogReducer";
import { initialiseUser } from "./reducers/loginReducer";

import Menu from "./components/Menu";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blog from "./components/routes/Blog";
import Blogs from "./components/routes/Blogs";
import User from "./components/routes/User";
import Users from "./components/routes/Users";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user);
  const users = useSelector(({ users }) => users);
  const blogs = useSelector(({ blogs }) => blogs);

  const blogFormRef = useRef();

  useEffect(() => {
    if (user !== null) {
      dispatch(initializeBlogs());
    }
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(initialiseUser());
  }, []);

  const blogById = (id) => blogs.find((b) => b.id === id);
  const userById = (id) => users.find((u) => u.id === id);

  const blogMatch = useMatch("/blogs/:id");
  const matchedBlog = blogMatch ? blogById(blogMatch.params.id) : null;

  const userMatch = useMatch("/users/:id");
  const matchedUser = userMatch ? userById(userMatch.params.id) : null;

  return (
    <div className="container">
      <Notification />

      {user === null ? (
        <LoginForm />
      ) : (
        <>
          <Menu />

          <h2>Blog list application</h2>

          <Routes>
            <Route path="/" element={<Blogs blogFormRef={blogFormRef} />} />
            <Route path="/blogs/:id" element={<Blog blog={matchedBlog} />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User user={matchedUser} />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
