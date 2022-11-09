import User from '../types/User';

export interface UserState {
  current: User | null;
  isLoggedIn: boolean;
}

export interface SnackbarState {
  message: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
}
