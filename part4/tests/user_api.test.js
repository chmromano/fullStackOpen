const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const User = require("../models/user");
const testHelper = require("./test_helper");

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(testHelper.listWithMultipleUsers);
});

describe("GET", () => {
  test("all users are returned as json", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all users are returned", async () => {
    const response = await api.get("/api/users");
    const userList = response.body;

    expect(userList).toHaveLength(testHelper.listWithMultipleUsers.length);
  });

  test("users don't have the passwordHash property", async () => {
    const response = await api.get("/api/users");
    const userList = response.body;

    userList.forEach((user) => expect(user.passwordHash).not.toBeDefined());
  });
});

describe("POST", () => {
  test("a user can be added to the database", async () => {
    const postedUser = {
      username: "the_senate",
      name: "Sheev Palpatine",
      password: "nonHashedPw",
    };

    await api
      .post("/api/users")
      .send(postedUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    delete postedUser.password;

    const usersAtEnd = await testHelper.usersInDb();

    expect(usersAtEnd).toHaveLength(
      testHelper.listWithMultipleUsers.length + 1
    );
    expect(usersAtEnd).toEqual(
      expect.arrayContaining([expect.objectContaining(postedUser)])
    );
  });

  test("if username is missing respond with 400 bad request", async () => {
    const noUsernameUser = {
      name: "Sheev Palpatine",
      password: "scn392rh4rjb",
    };

    await api.post("/api/users").send(noUsernameUser).expect(400);

    const usersAtEnd = await testHelper.usersInDb();

    expect(usersAtEnd).toHaveLength(testHelper.listWithMultipleUsers.length);
    expect(usersAtEnd).not.toContainEqual(
      expect.objectContaining(noUsernameUser)
    );
  });

  test("if name is missing respond with 400 bad request", async () => {
    const noNameUser = {
      username: "the_senate",
      password: "scn392rh4rjb",
    };

    await api.post("/api/users").send(noNameUser).expect(400);

    const usersAtEnd = await testHelper.usersInDb();

    expect(usersAtEnd).toHaveLength(testHelper.listWithMultipleUsers.length);
    expect(usersAtEnd).not.toContainEqual(expect.objectContaining(noNameUser));
  });

  test("if password is missing respond with 400 bad request", async () => {
    const noPasswordUser = {
      username: "the_senate",
      name: "Sheev Palpatine",
    };

    await api.post("/api/users").send(noPasswordUser).expect(400);

    const usersAtEnd = await testHelper.usersInDb();

    expect(usersAtEnd).toHaveLength(testHelper.listWithMultipleUsers.length);
    expect(usersAtEnd).not.toContainEqual(
      expect.objectContaining(noPasswordUser)
    );
  });

  test("if password is null respond with 400 bad request", async () => {
    const nullPasswordUser = {
      username: "the_senate",
      name: "Sheev Palpatine",
      password: null,
    };

    await api.post("/api/users").send(nullPasswordUser).expect(400);

    const usersAtEnd = await testHelper.usersInDb();

    expect(usersAtEnd).toHaveLength(testHelper.listWithMultipleUsers.length);
    expect(usersAtEnd).not.toContainEqual(
      expect.objectContaining(nullPasswordUser)
    );
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
