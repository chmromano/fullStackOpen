import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import React from "react";
import userEvent from "@testing-library/user-event";

describe("<Blog />", () => {
  let container;
  let mockHandler;
  const blog = {
    _id: "5a422b891b54a676234d17fa",
    author: "Robert C. Martin",
    likes: 32432524,
    title: "First class tests",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
    user: { username: "test" },
  };

  beforeEach(() => {
    mockHandler = jest.fn();
    container = render(
      <Blog
        user={{ username: "test" }}
        blog={blog}
        blogs={[]}
        onDelete={jest.fn()}
        onLike={mockHandler}
      />
    ).container;
  });

  test("renders blog content, hides hidden by default", () => {
    const blogContent = screen.findByText(`${blog.title} ${blog.author}`);
    const hiddenPartOfBlog = container.querySelector(".hiddenBlogDetails");
    const url = container.querySelector(".blogUrl");
    const likes = container.querySelector(".blogLikes");

    expect(blogContent).toBeDefined();
    expect(hiddenPartOfBlog).toBeNull();
    expect(url).toBeNull();
    expect(likes).toBeNull();
  });

  test("shows hidden on view button press", async () => {
    const user = userEvent.setup();
    const button = container.querySelector(".blogDetailsButton");
    await user.click(button);

    const blogContent = screen.findByText(`${blog.title} ${blog.author}`);
    const hiddenPartOfBlog = container.querySelector(".hiddenBlogDetails");
    const url = container.querySelector(".blogUrl");
    const likes = container.querySelector(".blogLikes");

    expect(blogContent).toBeDefined();
    expect(hiddenPartOfBlog).toBeDefined();
    expect(url).toBeDefined();
    expect(likes).toBeDefined();
  });

  test("pressing like button calls event handler", async () => {
    const user = userEvent.setup();
    const showHideBtton = container.querySelector(".blogDetailsButton");
    await user.click(showHideBtton);

    const blogLikeButton = container.querySelector(".blogLikeButton");
    await user.click(blogLikeButton);
    await user.click(blogLikeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
