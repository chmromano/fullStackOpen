import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<BlogForm />", () => {
  let container;
  let createBlog;

  beforeEach(() => {
    createBlog = jest.fn();
    container = render(
      <BlogForm onCreate={createBlog} blogFormRef={jest.fn()} />
    ).container;
  });

  test("calls create blog event handler with correct input data", async () => {
    const user = userEvent.setup();
    const togglableComponentShowButton = container.querySelector(
      ".togglableComponentShowButton"
    );
    await user.click(togglableComponentShowButton);

    const title = container.querySelector("#blogTitle");
    const author = container.querySelector("#blogAuthor");
    const url = container.querySelector("#blogUrl");

    const blog = {
      author: "testing author",
      title: "testing title",
      url: "testing url",
    };

    await user.type(title, blog.title);
    await user.type(author, blog.author);
    await user.type(url, blog.url);

    const blogFormSubmitButton = container.querySelector(
      ".blogFormSubmitButton"
    );
    await user.click(blogFormSubmitButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toEqual(blog);
  });
});
