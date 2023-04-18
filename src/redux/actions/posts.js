import axios from '../../axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (sortParam, thunkAPI) => {
  try {
    const { data } = await axios.get(`/posts?sortBy=${sortParam}`);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue('При загрузке постов произошла ошибка');
  }
});

export const fetchPostsWithTag = createAsyncThunk(
  'posts/fetchPostsWithTag',
  async (tag, thunkAPI) => {
    try {
      const { data } = await axios.get(`/tags/${tag}`);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue('При загрузке постов по тегу произошла ошибка');
    }
  }
);

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (id, thunkAPI) => {
  try {
    const { data } = await axios.get(`/posts/${id}`);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue('При загрузке статьи произошла ошибка');
  }
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get('/tags');
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue('При загрузке тегов произошла ошибка');
  }
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id, thunkAPI) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue('При удалении статьи произошла ошибка');
  }
});

export const fetchRemoveComment = createAsyncThunk(
  'comments/fetchRemoveComment',
  async (commentId, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/comments/${commentId}`);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue('При удалении комментария произошла ошибка');
    }
  }
);

export const fetchLastComments = createAsyncThunk(
  'comments/fetchLastComments',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`/comments`);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue('При загрузке комментариев произошла ошибка');
    }
  }
);

export const fetchCreateComment = createAsyncThunk(
  'comments/fetchCreateComment',
  async ({ id, text }, thunkAPI) => {
    try {
      const { data } = await axios.post(`/comments/${id}`, { text });
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue('При отправке комментария на серевер произошла ошибка');
    }
  }
);

export const fetchCommentsById = createAsyncThunk(
  'posts/fetchCommentsById',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`/comments/${id}`);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue('При загрузке комментариев произошла ошибка');
    }
  }
);
