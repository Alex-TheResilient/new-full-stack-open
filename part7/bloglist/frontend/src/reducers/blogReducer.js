import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    },
    removeBlogFromStore(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    commentBlog(state, action) {
      const commentedBlog = action.payload;
      return state.map((blog) =>
        blog.id === commentedBlog.id ? commentedBlog : blog
      );
    },
  },
});

export const {
  setBlogs,
  appendBlog,
  updateBlog,
  removeBlogFromStore,
  commentBlog,
} = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
    return newBlog;
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    const returnedBlog = await blogService.update(blog.id, updatedBlog);
    dispatch(updateBlog(returnedBlog));
    return returnedBlog;
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(removeBlogFromStore(id));
  };
};

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.comment(id, comment);
    dispatch(commentBlog(updatedBlog));
    return updatedBlog;
  };
};

export default blogSlice.reducer;
