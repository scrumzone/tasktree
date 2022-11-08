import React from 'react';
import { Button, Typography } from '@mui/material';
import User, { BlankUser } from '../types/User';
import AuthService from '../services/AuthService';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import CreateTaskDialog from '../components/CreateTaskDialog';
import Task from '../types/Task';
import EditTaskDialog from '../components/EditTaskDialog';
import { BlankProject } from '../types/Project';
import ProjectService from '../services/ProjectService';
import ProjectForm from '../components/ProjectForm';
import NestedList from '../components/Project';

function logout(setUser: React.Dispatch<React.SetStateAction<User>>, clearCurrentUser: () => void) {
  AuthService.signOut();
  setUser(BlankUser);
  clearCurrentUser();
}

export default function HomePage() {
  const [user, setUser] = React.useState(BlankUser);
  const [projects, setProjects] = React.useState([BlankProject]);
  const dispatch = useAppDispatch();

  const current = useAppSelector((state) => state.user.current);

  React.useEffect(() => {
    const fetchUserProjects = async () => {
      setUser(current || BlankUser);
      setProjects(await ProjectService.getProjects());
    };
    fetchUserProjects();
  }, []);

  return (
    <div>
      <Typography variant="h1">Hello, {user.firstName}!</Typography>
      <Typography variant="h4">
        You have completed{' '}
        {projects.length - projects.filter((project) => project.progress < 100).length} of your{' '}
        {projects.length} projects.
      </Typography>
      <Typography variant="h5">Recent projects</Typography>
    </div>
  );
}
