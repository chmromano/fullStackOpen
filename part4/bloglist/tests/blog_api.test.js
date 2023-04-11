const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");
const testHelper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(testHelper.listWithMultipleBlogs);
});

test("all blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  const blogList = response.body;

  expect(blogList).toHaveLength(testHelper.listWithMultipleBlogs.length);
});

test("blogs have the 'id' propery", async () => {
  const response = await api.get("/api/blogs");
  const blogList = response.body;

  blogList.forEach((blog) => expect(blog.id).toBeDefined());
});

test("a blog can be added to the database", async () => {
  const postedBlog = {
    title: "Test blog",
    author: "Test Testerson",
    url: "http://www.testblog.com/this-is-a-test-blog",
    likes: 3,
  };

  await api
    .post("/api/blogs")
    .send(postedBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await testHelper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(testHelper.listWithMultipleBlogs.length + 1);
  expect(blogsAtEnd).toEqual(
    expect.arrayContaining([expect.objectContaining(postedBlog)])
  );
});

test("if likes are missing default to 0", async () => {
  const postedBlog = {
    title: "Test blog",
    author: "Test Testerson",
    url: "http://www.testblog.com/this-is-a-test-blog",
  };

  const expectedBlog = {
    title: "Test blog",
    author: "Test Testerson",
    url: "http://www.testblog.com/this-is-a-test-blog",
    likes: 0,
  };

  await api
    .post("/api/blogs")
    .send(postedBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await testHelper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(testHelper.listWithMultipleBlogs.length + 1);
  expect(blogsAtEnd).toEqual(
    expect.arrayContaining([expect.objectContaining(expectedBlog)])
  );
});

test("if title is missing respond with 400 bad request", async () => {
  const noTitleBlog = {
    author: "Test Testerson",
    url: "http://www.testblog.com/this-is-a-test-blog",
  };

  await api.post("/api/blogs").send(noTitleBlog).expect(400);
});

test("if url is missing respond with 400 bad request", async () => {
  const noUrlBlog = {
    title: "Test blog",
    author: "Test Testerson",
  };

  await api.post("/api/blogs").send(noUrlBlog).expect(400);
});

afterAll(async () => {
  await mongoose.connection.close();
});
