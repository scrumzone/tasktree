import React from 'react';
import { Button, Typography } from '@mui/material';
import UserService from '../services/UserService';
import User, { BlankUser } from '../types/User';
import AuthService from '../services/AuthService';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearCurrentUser } from '../store/user';
import ProjectService from '../services/ProjectService';
import { BlankProject } from '../types/Project';

function logout(setUser: React.Dispatch<React.SetStateAction<User>>, clearCurrentUser: () => void) {
  AuthService.signOut();
  setUser(BlankUser);
  clearCurrentUser();
}

export default function HomePage() {
  const [user, setUser] = React.useState(BlankUser);
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
      <Button
        onClick={() => {
          logout(setUser, () => {
            dispatch(clearCurrentUser());
          });
        }}>
        Log Out
      </Button>
      <Button onClick={() => console.log(ProjectService.createProject(BlankProject))}>Create Project</Button>
      <Button onClick={() => console.log(ProjectService.deleteProject(1))}>Delete Project</Button>
      <Button onClick={() => console.log(ProjectService.updateProject({name: "Cheese", progress: 5}, 1))}>Update Project</Button>
      <Button onClick={() => console.log(ProjectService.getProject(1))}>Get Project</Button>
      <Button onClick={() => console.log(ProjectService.getProjects())}>Get Projects</Button>
      <p>{user.username}</p>
    </div>
  );
}
