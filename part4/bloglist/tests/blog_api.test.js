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

test("blogs are returned as json", async () => {
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

afterAll(async () => {
  await mongoose.connection.close();
});
