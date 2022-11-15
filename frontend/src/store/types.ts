import User from '../types/User';

export interface UserState {
  current: User | null;
  isLoggedIn: boolean;
}

export interface SnackbarState {
  open?: boolean;
  message: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
}
