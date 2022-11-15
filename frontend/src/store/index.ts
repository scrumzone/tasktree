import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import snackbarReducer from './snackbar';
import { SnackbarState, UserState } from './types';
import AuthService from '../services/AuthService';

export type RootState = {
  user: UserState;
  snackbar: SnackbarState;
};

function preloadState(): RootState {
  const jwt = AuthService.getJWT();
  const user = AuthService.decodeJWT(jwt);
  return { user: { current: user, isLoggedIn: !!user }, snackbar: { message: '' } };
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    snackbar: snackbarReducer
  },
  preloadedState: preloadState(),
  devTools: true
});

export type AppDispatch = typeof store.dispatch;
