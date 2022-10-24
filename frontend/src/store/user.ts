import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import User from '../types/User';
import { UserState } from './types';

const initialState: UserState = {
  current: null,
  isLoggedIn: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.current = action.payload;
      state.isLoggedIn = action.payload !== null;
    },
    clearCurrentUser: (state) => {
      return initialState;
    }
  }
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;

export default userSlice.reducer;
