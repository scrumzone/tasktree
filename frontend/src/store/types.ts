import User from '../types/User';

export interface UserState {
  current: User | null;
  isLoggedIn: boolean;
}
