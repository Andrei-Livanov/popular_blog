import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/slices/authSlice';
import { Post, AddComment, CommentsBlock } from '../components';
import { fetchCommentsById, fetchPostById } from '../redux/actions/posts';

export const FullPost = () => {
  const dispatch = useDispatch();
  const { data, status, comments } = useSelector((state) => state.posts.currentPost);
  const isAuth = useSelector(selectIsAuth);

  const isDataLoading = status === 'loading';
  const isCommentsLoading = comments.status === 'loading';

  const { id } = useParams();

  React.useEffect(() => {
    dispatch(fetchPostById(id));
    dispatch(fetchCommentsById(id));
  }, []);

  if (isDataLoading || isCommentsLoading) {
    return <Post isLoading={true} isFullPost />;
  }

  return (
    <Grid xs={12} md={8} item>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={comments.items.length}
        tags={data.tags}
        isFullPost
      >
        <div>
          <ReactMarkdown children={data.text} />
        </div>
      </Post>
      <CommentsBlock items={comments.items} isLoading={isCommentsLoading} isFullComment>
        {isAuth ? <AddComment /> : null}
      </CommentsBlock>
    </Grid>
  );
};
