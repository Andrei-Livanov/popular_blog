import axios from '../../axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params, thunkAPI) => {
  try {
    const { data } = await axios.post('auth/login', params);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue('Не удалось авторизоваться');
  }
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get('auth/me');
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue('Ошибка авторизации');
  }
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params, thunkAPI) => {
  try {
    const { data } = await axios.post('auth/register', params);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue('Не удалось зарегистрироваться');
  }
});
