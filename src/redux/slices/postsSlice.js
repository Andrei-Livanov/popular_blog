import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPosts,
  fetchPostsWithTag,
  fetchRemovePost,
  fetchTags,
  fetchLastComments,
  fetchPostById,
  fetchCommentsById,
  fetchCreateComment,
  fetchRemoveComment,
} from '../actions/posts';

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
  comments: {
    items: [],
    status: 'loading',
  },
  currentPost: {
    status: 'loading',
    data: {},
    comments: {
      status: 'loading',
      items: [],
    },
    comment: {
      text: '',
      status: 'loaded',
    },
  },
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setCommentTextInput(state, action) {
      state.currentPost.comment.text = action.payload;
    },
  },
  extraReducers: {
    // Get posts
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },

    // Get posts by tag
    [fetchPostsWithTag.pending]: (state) => {
      state.posts.status = 'loading';
      state.posts.items = [];
    },
    [fetchPostsWithTag.fulfilled]: (state, action) => {
      state.posts.status = 'loaded';
      state.posts.items = action.payload;
    },
    [fetchPostsWithTag.rejected]: (state) => {
      state.posts.status = 'error';
      state.posts.items = [];
    },

    // Get tags
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },

    // Delete post
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
    },

    // Delete comment
    [fetchRemoveComment.fulfilled]: (state, action) => {
      state.currentPost.comments.items = state.currentPost.comments.items.filter(
        (comment) => comment._id !== action.meta.arg
      );
    },

    // Get comments
    [fetchLastComments.pending]: (state) => {
      state.comments.status = 'loading';
      state.comments.items = [];
    },
    [fetchLastComments.fulfilled]: (state, action) => {
      state.comments.status = 'loaded';
      state.comments.items = action.payload;
    },
    [fetchLastComments.rejected]: (state) => {
      state.comments.status = 'error';
      state.comments.items = [];
    },

    // Get post by id
    [fetchPostById.pending]: (state) => {
      state.currentPost.status = 'loading';
      state.currentPost.data = {};
    },
    [fetchPostById.fulfilled]: (state, action) => {
      state.currentPost.status = 'loaded';
      state.currentPost.data = action.payload;
    },
    [fetchPostById.rejected]: (state) => {
      state.currentPost.status = 'error';
      state.currentPost.data = {};
    },

    // Get comment by id
    [fetchCommentsById.pending]: (state) => {
      state.currentPost.comments.status = 'loading';
      state.currentPost.comments.items = [];
    },
    [fetchCommentsById.fulfilled]: (state, action) => {
      state.currentPost.comments.status = 'loaded';
      state.currentPost.comments.items = action.payload;
    },
    [fetchCommentsById.rejected]: (state) => {
      state.currentPost.comments.status = 'error';
      state.currentPost.comments.items = [];
    },

    // Create comment
    [fetchCreateComment.pending]: (state) => {
      state.currentPost.comment.status = 'loading';
    },
    [fetchCreateComment.fulfilled]: (state, action) => {
      state.currentPost.comments.items = action.payload;
      state.currentPost.comment.text = '';
      state.currentPost.comment.status = 'loaded';
    },
    [fetchCreateComment.rejected]: (state) => {
      state.currentPost.comment.status = 'error';
    },
  },
});

export const { setCommentTextInput } = postSlice.actions;

export const postsReducer = postSlice.reducer;
