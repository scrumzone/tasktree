import React from 'react';
import { Button, Typography } from '@mui/material';
import UserService from '../services/UserService';
import User, { BlankUser } from '../types/User';
import AuthService from '../services/AuthService';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearCurrentUser } from '../store/user';
import CreateTaskFormDialog from '../components/CreateTaskFormDialog';
import ProjectService from '../services/ProjectService';
import { BlankProject } from '../types/Project';

function logout(setUser: React.Dispatch<React.SetStateAction<User>>, clearCurrentUser: () => void) {
  AuthService.signOut();
  setUser(BlankUser);
  clearCurrentUser();
}

export default function HomePage() {
  const [user, setUser] = React.useState(BlankUser);
  const [dOpen, setDOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  const current = useAppSelector((state) => state.user.current);

  React.useEffect(() => {
    const fetchUser = async () => {
      setUser(current || BlankUser);
    };
    fetchUser();
  }, []);

  return (
    <div>
      <Typography variant="h1">HOME PAGE</Typography>
      <Typography variant="h4">Hello, {user.username}!</Typography>
      <Button variant="outlined" onClick={() => setDOpen(true)}>
        Open CreateTaskFormDialog
      </Button>
      <CreateTaskFormDialog
        open={dOpen}
        onClose={() => setDOpen(false)}
        onSubmit={(formData) => {
          console.log(formData);
        }}
      />
    </div>
  );
}
