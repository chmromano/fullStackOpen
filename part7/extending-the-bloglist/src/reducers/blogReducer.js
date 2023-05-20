import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      return [...state, { ...action.payload, likes: 0 }];
    },
    like(state, action) {
      const blogs = state
        .map((blog) =>
          action.payload === blog.id ? { ...blog, likes: blog.likes + 1 } : blog
        )
        .sort((a, b) => b.likes - a.likes);

      return blogs;
    },
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    commentBlogState(state, action) {
      const blogs = state.map((blog) =>
        action.payload.id === blog.id
          ? { ...blog, comments: [...blog.comments, action.payload.comment] }
          : blog
      );

      return blogs;
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog, user) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.create(blog);
    dispatch(
      appendBlog({
        ...returnedBlog,
        user: {
          id: returnedBlog.user,
          name: user.name,
          username: user.username,
        },
      })
    );
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    await blogService.update(blog.id, updatedBlog);
    dispatch(like(blog.id));
  };
};

export const clearBlogs = () => {
  return (dispatch) => {
    dispatch(setBlogs([]));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(removeBlog(id));
  };
};

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    try {
      await blogService.addComment(id, comment);
      dispatch(commentBlogState({ id, comment }));
    } catch (error) {
      const notification = { error: true, text: "Something went wrong" };
      dispatch(setNotification(notification, 5000));
    }
  };
};

export const { like, appendBlog, setBlogs, removeBlog, commentBlogState } =
  blogSlice.actions;

export default blogSlice.reducer;
