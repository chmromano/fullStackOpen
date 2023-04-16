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
      name: "Sheev Palpatine",
      password: "nonHashedPw",
      username: "the_senate",
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

  test("a user without name can be added to the database", async () => {
    const noNameUser = {
      password: "scn392rh4rjb",
      username: "the_senate",
    };

    await api.post("/api/users").send(noNameUser).expect(201);

    delete noNameUser.password;

    const usersAtEnd = await testHelper.usersInDb();

    expect(usersAtEnd).toHaveLength(
      testHelper.listWithMultipleUsers.length + 1
    );
    expect(usersAtEnd).toContainEqual(expect.objectContaining(noNameUser));
  });

  test("a user with a 3 character name can be added to the database", async () => {
    const shortUsernameUser = {
      name: "Sheev Palpatine",
      password: "nonHashedPw",
      username: "the",
    };

    await api.post("/api/users").send(shortUsernameUser).expect(201);

    delete shortUsernameUser.password;

    const usersAtEnd = await testHelper.usersInDb();

    expect(usersAtEnd).toHaveLength(
      testHelper.listWithMultipleUsers.length + 1
    );
    expect(usersAtEnd).toContainEqual(
      expect.objectContaining(shortUsernameUser)
    );
  });

  test("if username is shorter than 3 respond with 400 bad request", async () => {
    const shortUsernameUser = {
      name: "Sheev Palpatine",
      password: "nonHashedPw",
      username: "th",
    };

    await api.post("/api/users").send(shortUsernameUser).expect(400);

    const usersAtEnd = await testHelper.usersInDb();

    expect(usersAtEnd).toHaveLength(testHelper.listWithMultipleUsers.length);
    expect(usersAtEnd).not.toContainEqual(
      expect.objectContaining(shortUsernameUser)
    );
  });

  test("if username already exists respond with 400 bad request", async () => {
    const postedUser = {
      name: "Sheev Palpatine",
      password: "nonHashedPw",
      username: "the_senate",
    };

    await api.post("/api/users").send(postedUser).expect(201);
    await api.post("/api/users").send(postedUser).expect(400);

    const usersAtEnd = await testHelper.usersInDb();

    expect(usersAtEnd).toHaveLength(
      testHelper.listWithMultipleUsers.length + 1
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

  test("if password is shorter than 3 respond with 400 bad request", async () => {
    const shortPasswordUser = {
      name: "Sheev Palpatine",
      password: "no",
      username: "the_senate",
    };

    await api.post("/api/users").send(shortPasswordUser).expect(400);

    const usersAtEnd = await testHelper.usersInDb();

    expect(usersAtEnd).toHaveLength(testHelper.listWithMultipleUsers.length);
    expect(usersAtEnd).not.toContainEqual(
      expect.objectContaining(shortPasswordUser)
    );
  });

  test("if password is exactly 3 characters add user to database", async () => {
    const shortPasswordUser = {
      name: "Sheev Palpatine",
      password: "now",
      username: "the_senate",
    };

    await api.post("/api/users").send(shortPasswordUser).expect(201);

    delete shortPasswordUser.password;

    const usersAtEnd = await testHelper.usersInDb();

    expect(usersAtEnd).toHaveLength(
      testHelper.listWithMultipleUsers.length + 1
    );
    expect(usersAtEnd).toContainEqual(
      expect.objectContaining(shortPasswordUser)
    );
  });

  test("if password is missing respond with 400 bad request", async () => {
    const noPasswordUser = {
      name: "Sheev Palpatine",
      username: "the_senate",
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
      name: "Sheev Palpatine",
      password: null,
      username: "the_senate",
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
