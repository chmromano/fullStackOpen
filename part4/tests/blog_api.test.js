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

describe("GET", () => {
  test("blogs have the 'id' propery", async () => {
    const response = await api.get("/api/blogs");
    const blogList = response.body;

    blogList.forEach((blog) => expect(blog.id).toBeDefined());
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
});

describe("POST", () => {
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
    expect(blogsAtEnd).toHaveLength(
      testHelper.listWithMultipleBlogs.length + 1
    );
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
    expect(blogsAtEnd).toHaveLength(
      testHelper.listWithMultipleBlogs.length + 1
    );
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

    const blogsAtEnd = await testHelper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(testHelper.listWithMultipleBlogs.length);
  });

  test("if url is missing respond with 400 bad request", async () => {
    const noUrlBlog = {
      title: "Test blog",
      author: "Test Testerson",
    };

    await api.post("/api/blogs").send(noUrlBlog).expect(400);

    const blogsAtEnd = await testHelper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(testHelper.listWithMultipleBlogs.length);
  });

  // test("blog has user assigned to it", async () => {
  //   const postedBlog = {
  //     title: "Test blog",
  //     author: "Test Testerson",
  //     url: "http://www.testblog.com/this-is-a-test-blog",
  //     likes: 3,
  //   };

  //   await api.post("/api/blogs").send(postedBlog).expect(201);

  //   const response = await api.get("/api/blogs");
  //   const blogList = response.body;

  //   blogList.forEach((blog) => {
  //     expect(blog.user).toBeDefined();
  //     expect(blog.user.username).toBeDefined();
  //     expect(blog.user.id).toBeDefined();
  //   });
  // });
});

describe("DELETE", () => {
  test("deletion of a blog succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await testHelper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await testHelper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(
      testHelper.listWithMultipleBlogs.length - 1
    );
    expect(blogsAtEnd).not.toContainEqual(
      expect.objectContaining(blogToDelete)
    );
  });

  test("deletion of blog fails with status code 404 if blog does not exist", async () => {
    const blogsAtStart = await testHelper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtHalf = await testHelper.blogsInDb();

    expect(blogsAtHalf).toHaveLength(
      testHelper.listWithMultipleBlogs.length - 1
    );
    expect(blogsAtHalf).not.toContainEqual(
      expect.objectContaining(blogToDelete)
    );

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(404);

    const blogsAtEnd = await testHelper.blogsInDb();

    expect(blogsAtEnd).toEqual(blogsAtHalf);
  });
});

describe("PATCH", () => {
  test("update of a blog succeeds with status code 200 if id is valid", async () => {
    const blogsAtStart = await testHelper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      title: "Testing patch",
      author: "Test Testerson",
      url: "https://test.com",
      likes: 2,
    };

    await api
      .patch(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);

    updatedBlog.id = blogToUpdate.id;

    const blogsAtEnd = await testHelper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(testHelper.listWithMultipleBlogs.length);
    expect(blogsAtEnd).toContainEqual(expect.objectContaining(updatedBlog));
  });

  test("update of a blog succeeds with status code 200 even if object parameters are undefined", async () => {
    const blogsAtStart = await testHelper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      title: "Testing patch with undefined parameters",
    };

    await api
      .patch(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);

    updatedBlog.id = blogToUpdate.id;
    updatedBlog.author = blogsAtStart[0].author;
    updatedBlog.url = blogsAtStart[0].url;
    updatedBlog.likes = blogsAtStart[0].likes;

    const blogsAtEnd = await testHelper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(testHelper.listWithMultipleBlogs.length);
    expect(blogsAtEnd).toContainEqual(expect.objectContaining(updatedBlog));
  });

  test("update of a blog fails with status code 404 if blog does not exist", async () => {
    const blogsAtStart = await testHelper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToUpdate.id}`).expect(204);

    const updatedBlog = {
      title: "Testing patch",
      author: "Test Testerson",
      url: "https://test.com",
      likes: 2,
    };

    await api
      .patch(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(404);

    updatedBlog.id = blogToUpdate.id;

    const blogsAtEnd = await testHelper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(
      testHelper.listWithMultipleBlogs.length - 1
    );
    expect(blogsAtEnd).not.toContainEqual(expect.objectContaining(updatedBlog));
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
