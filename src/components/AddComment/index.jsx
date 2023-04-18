import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingButton } from '@mui/lab';
import Avatar from '@mui/material/Avatar';
import styles from './AddComment.module.scss';
import TextField from '@mui/material/TextField';

import { fetchCreateComment } from '../../redux/actions/posts';
import { setCommentTextInput } from '../../redux/slices/postsSlice';

export const AddComment = () => {
  const dispatch = useDispatch();
  const { avatarUrl } = useSelector((state) => state.auth.data);
  const { text, status } = useSelector((state) => state.posts.currentPost.comment);

  const commentIsLoading = status === 'loading';

  const { id } = useParams();

  const sendComment = () => {
    dispatch(fetchCreateComment({ id, text }));
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={avatarUrl} />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={text}
            onChange={(e) => dispatch(setCommentTextInput(e.target.value))}
          />
          <LoadingButton
            loading={commentIsLoading}
            onClick={sendComment}
            variant="contained"
            disabled={text.length < 1}
          >
            Отправить
          </LoadingButton>
        </div>
      </div>
    </>
  );
};
