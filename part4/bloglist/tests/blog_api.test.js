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
  const newBlog = {
    title: "Test blog",
    author: "Test Testerson",
    url: "http://www.testblog.com/this-is-a-test-blog",
    likes: 3,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await testHelper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(testHelper.listWithMultipleBlogs.length + 1);
  expect(blogsAtEnd).toEqual(
    expect.arrayContaining([expect.objectContaining(newBlog)])
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});
