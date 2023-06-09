import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';

import { CommentsBlock, Post, TagsBlock } from '../components';
import { fetchLastComments, fetchPosts, fetchTags } from '../redux/actions/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags, comments } = useSelector((state) => state.posts);
  const [sortedBy, setSortedBy] = React.useState('latest');

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  const isCommentsLoading = comments.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts(sortedBy));
    dispatch(fetchTags());
    dispatch(fetchLastComments());
  }, [sortedBy]);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={sortedBy === 'latest' ? 0 : 1}
        aria-label="Сортировка статей"
      >
        <Tab label="Новые" onClick={() => setSortedBy('latest')} />
        <Tab label="Популярные" onClick={() => setSortedBy('views')} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={12} md={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((post, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={post._id}
                title={post.title}
                imageUrl={post.imageUrl ? `${process.env.REACT_APP_API_URL}${post.imageUrl}` : ''}
                user={post.user}
                createdAt={post.createdAt}
                viewsCount={post.viewsCount}
                commentsCount={post.commentsCount.length}
                tags={post.tags}
                isEditable={userData?._id === post.user._id}
                key={`homePost-${index}`}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item sx={{ display: { xs: 'none', md: 'block' } }}>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock items={comments.items} isLoading={isCommentsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
