import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import { UserState } from './types';
import AuthService from '../services/AuthService';

export type RootState = {
  user: UserState;
};

function preloadState(): RootState {
  const jwt = AuthService.getJWT();
  const user = AuthService.decodeJWT(jwt);
  return { user: { current: user, isLoggedIn: !!user } };
}

export const store = configureStore({
  reducer: {
    user: userReducer
  },
  preloadedState: preloadState(),
  devTools: true
});

export type AppDispatch = typeof store.dispatch;
