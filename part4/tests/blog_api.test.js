const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");
const testHelper = require("./test_helper");

const getToken = async () => {
  const response = await api
    .post("/api/login")
    .send({
      password: "nonHashedPw",
      username: "test",
    })
    .expect(200);

  return response.body.token;
};

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(testHelper.listWithMultipleBlogs);
  await User.deleteMany({});
  await User.insertMany(testHelper.listWithMultipleUsers);

  // add a test user
  await api
    .post("/api/users")
    .send({
      password: "nonHashedPw",
      username: "test",
    })
    .expect(201)
    .expect("Content-Type", /application\/json/);
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
    const token = await getToken();

    const postedBlog = {
      author: "Test Testerson",
      likes: 3,
      title: "Test blog",
      url: "http://www.testblog.com/this-is-a-test-blog",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
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
    const token = await getToken();

    const postedBlog = {
      author: "Test Testerson",
      title: "Test blog",
      url: "http://www.testblog.com/this-is-a-test-blog",
    };

    const expectedBlog = {
      author: "Test Testerson",
      likes: 0,
      title: "Test blog",
      url: "http://www.testblog.com/this-is-a-test-blog",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
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
    const token = await getToken();

    const noTitleBlog = {
      author: "Test Testerson",
      url: "http://www.testblog.com/this-is-a-test-blog",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(noTitleBlog)
      .expect(400);

    const blogsAtEnd = await testHelper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(testHelper.listWithMultipleBlogs.length);
  });

  test("if url is missing respond with 400 bad request", async () => {
    const token = await getToken();

    const noUrlBlog = {
      author: "Test Testerson",
      title: "Test blog",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(noUrlBlog)
      .expect(400);

    const blogsAtEnd = await testHelper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(testHelper.listWithMultipleBlogs.length);
  });

  test("if token is missing respond with 401 unauthorised", async () => {
    const testBlog = {
      author: "Test Testerson",
      likes: 3,
      title: "Test blog",
      url: "http://www.testblog.com/this-is-a-test-blog",
    };

    await api.post("/api/blogs").send(testBlog).expect(401);

    const blogsAtEnd = await testHelper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(testHelper.listWithMultipleBlogs.length);
  });
});

describe("DELETE", () => {
  test("deletion of a blog succeeds with status code 204 if id is valid", async () => {
    const token = await getToken();

    const testBlog = {
      author: "Test Testerson",
      title: "Test blog",
      url: "http://www.testblog.com/this-is-a-test-blog",
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(testBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtHalf = await testHelper.blogsInDb();

    expect(blogsAtHalf).toHaveLength(
      testHelper.listWithMultipleBlogs.length + 1
    );

    await api
      .delete(`/api/blogs/${response.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await testHelper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(testHelper.listWithMultipleBlogs.length);
    expect(blogsAtEnd).not.toContainEqual(expect.objectContaining(response));
  });

  test("deletion of blog fails with status code 404 if blog does not exist", async () => {
    const token = await getToken();

    const testBlog = {
      author: "Test Testerson",
      title: "Test blog",
      url: "http://www.testblog.com/this-is-a-test-blog",
    };

    const firstResponse = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(testBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const secondResponse = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(testBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtStart = await testHelper.blogsInDb();
    expect(blogsAtStart).toHaveLength(
      testHelper.listWithMultipleBlogs.length + 2
    );
    expect(blogsAtStart).toContainEqual(expect.objectContaining(testBlog));

    await api
      .delete(`/api/blogs/${firstResponse.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    await api
      .delete(`/api/blogs/${secondResponse.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsAtHalf = await testHelper.blogsInDb();
    expect(blogsAtHalf).toHaveLength(testHelper.listWithMultipleBlogs.length);
    expect(blogsAtHalf).not.toContainEqual(expect.objectContaining(testBlog));

    await api
      .delete(`/api/blogs/${firstResponse.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    const blogsAtEnd = await testHelper.blogsInDb();

    expect(blogsAtEnd).toEqual(blogsAtHalf);
  });
});

describe("PATCH", () => {
  test("update of a blog succeeds with status code 200 if id is valid", async () => {
    const token = await getToken();

    const testBlog = {
      author: "Test Testerson",
      title: "Test blog",
      url: "http://www.testblog.com/this-is-a-test-blog",
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(testBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtStart = await testHelper.blogsInDb();
    expect(blogsAtStart).toHaveLength(
      testHelper.listWithMultipleBlogs.length + 1
    );
    expect(blogsAtStart).toContainEqual(expect.objectContaining(testBlog));

    const updatedBlog = {
      author: "Test Testerson Jr.",
      likes: 2,
      title: "Testing patch",
      url: "https://test.com",
    };

    await api
      .patch(`/api/blogs/${response.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedBlog)
      .expect(200);

    const blogsAtEnd = await testHelper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(
      testHelper.listWithMultipleBlogs.length + 1
    );
    expect(blogsAtEnd).toContainEqual(expect.objectContaining(updatedBlog));
  });

  test("update of a blog succeeds with status code 200 even if object parameters are undefined", async () => {
    const token = await getToken();

    const testBlog = {
      author: "Test Testerson",
      likes: 4,
      title: "Test blog",
      url: "http://www.testblog.com/this-is-a-test-blog",
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(testBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtStart = await testHelper.blogsInDb();
    expect(blogsAtStart).toHaveLength(
      testHelper.listWithMultipleBlogs.length + 1
    );
    expect(blogsAtStart).toContainEqual(expect.objectContaining(testBlog));

    const updatedBlog = {
      title: "Testing patch with undefined parameters",
    };

    await api
      .patch(`/api/blogs/${response.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedBlog)
      .expect(200);

    updatedBlog.author = testBlog.author;
    updatedBlog.url = testBlog.url;
    updatedBlog.likes = testBlog.likes;

    const blogsAtEnd = await testHelper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(
      testHelper.listWithMultipleBlogs.length + 1
    );
    expect(blogsAtEnd).toContainEqual(expect.objectContaining(updatedBlog));
  });

  test("update of a blog fails with status code 404 if blog does not exist", async () => {
    const token = await getToken();

    const testBlog = {
      author: "Test Testerson",
      title: "Test blog",
      url: "http://www.testblog.com/this-is-a-test-blog",
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(testBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtStart = await testHelper.blogsInDb();
    expect(blogsAtStart).toHaveLength(
      testHelper.listWithMultipleBlogs.length + 1
    );
    expect(blogsAtStart).toContainEqual(expect.objectContaining(testBlog));

    await api
      .delete(`/api/blogs/${response.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsAtHalf = await testHelper.blogsInDb();
    expect(blogsAtHalf).toHaveLength(testHelper.listWithMultipleBlogs.length);
    expect(blogsAtHalf).not.toContainEqual(expect.objectContaining(testBlog));

    const updatedBlog = {
      author: "Test Testerson",
      likes: 2,
      title: "Testing patch",
      url: "https://test.com",
    };

    await api
      .patch(`/api/blogs/${response.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedBlog)
      .expect(404);

    const blogsAtEnd = await testHelper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(testHelper.listWithMultipleBlogs.length);
    expect(blogsAtEnd).not.toContainEqual(expect.objectContaining(updatedBlog));
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
