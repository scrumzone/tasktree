import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { SnackbarState } from './types';

const initialState: SnackbarState = {
  message: ''
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<SnackbarState>) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    clearSnackbar: (_) => {
      return initialState;
    }
  }
});

export const { showSnackbar, clearSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
