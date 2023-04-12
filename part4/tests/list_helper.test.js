const listHelper = require("../utils/list_helper");
const testHelper = require("./test_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is 0", () => {
    const result = listHelper.totalLikes(testHelper.listWithNoBlogs);

    expect(result).toBe(0);
  });

  test("of 1 blog is equal to that blog", () => {
    const result = listHelper.totalLikes(testHelper.listWithOneBlog);

    expect(result).toBe(5);
  });

  test("of multiple blogs is equal to sum of likes", () => {
    const result = listHelper.totalLikes(testHelper.listWithMultipleBlogs);

    expect(result).toBe(48);
  });
});

describe("favourite blog", () => {
  test("of empty list return empty object", () => {
    const result = listHelper.favoriteBlog(testHelper.listWithNoBlogs);

    expect(result).toEqual({});
  });

  test("of 1 blog returns that blog", () => {
    const result = listHelper.favoriteBlog(testHelper.listWithOneBlog);
    const expected = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    };

    expect(result).toEqual(expected);
  });

  test("of multiple blogs returns last blog with most likes", () => {
    const result = listHelper.favoriteBlog(testHelper.listWithMultipleBlogs);
    const expected = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      likes: 12,
    };

    expect(result).toEqual(expected);
  });
});

describe("most blogs", () => {
  test("of empty list return empty object", () => {
    const result = listHelper.mostBlogs(testHelper.listWithNoBlogs);

    expect(result).toEqual({});
  });

  test("of 1 blog returns that author", () => {
    const result = listHelper.mostBlogs(testHelper.listWithOneBlog);
    const expected = {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    };

    expect(result).toEqual(expected);
  });

  test("of multiple blogs returns author with most blogs", () => {
    const result = listHelper.mostBlogs(testHelper.listWithMultipleBlogs);
    const expected = {
      author: "Robert C. Martin",
      blogs: 3,
    };

    expect(result).toEqual(expected);
  });
});

describe("most likes", () => {
  test("of empty list return empty object", () => {
    const result = listHelper.mostLikes(testHelper.listWithNoBlogs);

    expect(result).toEqual({});
  });

  test("of 1 blog returns that author and likes count", () => {
    const result = listHelper.mostLikes(testHelper.listWithOneBlog);
    const expected = {
      author: "Edsger W. Dijkstra",
      likes: 5,
    };

    expect(result).toEqual(expected);
  });

  test("of multiple blogs returns author with most likes and total likes count", () => {
    const result = listHelper.mostLikes(testHelper.listWithMultipleBlogs);
    const expected = {
      author: "Robert C. Martin",
      likes: 24,
    };

    expect(result).toEqual(expected);
  });
});
