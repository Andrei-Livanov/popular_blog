import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Header.module.scss';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LoginIcon from '@mui/icons-material/Login';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { logout, selectIsAuth } from '../../redux/slices/authSlice';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <h1 title="На главную страницу">popular blog</h1>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">
                    <PostAddIcon titleAccess="Написать статью" />
                  </Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                  aria-label="Выйти"
                >
                  <LoginIcon titleAccess="Выйти" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button color="primary" component="button" variant="contained" aria-label="Войти">
                    <LoginIcon titleAccess="Войти" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button color="success" variant="contained" aria-label="Создать аккаунт">
                    <PersonAddIcon titleAccess="Создать аккаунт" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
