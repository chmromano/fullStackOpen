const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const savedBlog = await blog.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const deletedBlog = await Blog.findByIdAndRemove(request.params.id);

  deletedBlog ? response.status(204).end() : response.status(404).end();
});

blogsRouter.patch("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = {
    title,
    author,
    url,
    likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
  });

  updatedBlog
    ? response.status(200).json(updatedBlog)
    : response.status(400).json({ error: "resource does not exist" });
});

module.exports = blogsRouter;
