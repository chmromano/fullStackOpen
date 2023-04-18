import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import React from "react";

test("renders content", () => {
  const blog = {
    _id: "5a422b891b54a676234d17fa",
    author: "Robert C. Martin",
    likes: 32432524,
    title: "First class tests",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
    user: { username: "test" },
  };

  const { container } = render(
    <Blog
      user={{ username: "test" }}
      blog={blog}
      blogs={[]}
      setBlogs={jest.fn()}
      setMessage={jest.fn()}
    />
  );

  const content = screen.findByText(`${blog.title} ${blog.author}`);
  const hiddenPartOfBlog = container.querySelector(".hiddenPartOfBlog");
  const url = container.querySelector(".blogUrl");
  const likes = container.querySelector(".blogLikes");

  expect(content).toBeDefined();

  expect(hiddenPartOfBlog).toBeNull();
  expect(url).toBeNull();
  expect(likes).toBeNull();
});
