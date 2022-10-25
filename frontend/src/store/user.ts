import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import User from '../types/User';

interface UserState {
  currentUser: User | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isLoggedIn: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
      state.isLoggedIn = action.payload !== null;
    },
    clearCurrentUser: (_) => {
      return initialState;
    }
  }
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;

export default userSlice.reducer;
