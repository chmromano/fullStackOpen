const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 });

  response.status(200).json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const { title, author, url, likes } = request.body;

  if (!request.user) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(request.user.id);

  const blog = new Blog({
    author,
    likes,
    title,
    url,
    user: user.id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "invalid token" });
  }

  const checkBlog = await Blog.findById(request.params.id, { user: 1 });

  if (!checkBlog) {
    return response.status(404).json({ error: "resource does not exist" });
  }

  if (request.user.id !== checkBlog.user.toString()) {
    return response.status(401).json({ error: "not authorised" });
  }

  const deletedBlog = await Blog.findByIdAndRemove(request.params.id);

  if (deletedBlog) {
    const user = await User.findById(request.user.id);
    user.blogs = user.blogs.filter(
      (blog) => blog.toString() !== request.params.id
    );

    await user.save();
  }

  deletedBlog
    ? response.status(204).end()
    : response.status(404).json({ error: "resource does not exist" });
});

blogsRouter.patch("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;

  if (!request.user) {
    return response.status(401).json({ error: "invalid token" });
  }

  const checkBlog = await Blog.findById(request.params.id, { user: 1 });

  if (!checkBlog) {
    return response.status(404).json({ error: "resource does not exist" });
  }

  if (request.user.id !== checkBlog.user.toString()) {
    return response.status(401).json({ error: "not authorised" });
  }

  const blog = {
    author,
    likes,
    title,
    url,
    user: request.user.id,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
  });

  updatedBlog
    ? response.status(200).json(updatedBlog)
    : response.status(404).json({ error: "resource does not exist" });
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;

  if (!request.user) {
    return response.status(401).json({ error: "invalid token" });
  }

  const checkBlog = await Blog.findById(request.params.id, { user: 1 });

  if (!checkBlog) {
    return response.status(404).json({ error: "resource does not exist" });
  }

  if (request.user.id !== checkBlog.user.toString()) {
    return response.status(401).json({ error: "not authorised" });
  }

  const blog = {
    author,
    likes,
    title,
    url,
    user: request.user.id,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
  });

  updatedBlog
    ? response.status(200).json(updatedBlog)
    : response.status(404).json({ error: "resource does not exist" });
});

module.exports = blogsRouter;
