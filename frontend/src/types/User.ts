export default interface User {
  id?: number;
  username: string;
  firstName: string;
  lastName?: string;
  password?: string;
}

export const BlankUser: User = {
  id: 0,
  username: '',
  firstName: '',
  lastName: ''
};
