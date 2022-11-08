import React from 'react';
import { Box, Typography } from '@mui/material';
import User, { BlankUser } from '../types/User';
import AuthService from '../services/AuthService';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Project from '../types/Project';
import ProjectService from '../services/ProjectService';
import ProjectList from '../components/ProjectList';

function logout(setUser: React.Dispatch<React.SetStateAction<User>>, clearCurrentUser: () => void) {
  AuthService.signOut();
  setUser(BlankUser);
  clearCurrentUser();
}

function getRecentProjects(projects: Project[]) {
  projects.sort((a, b) => (a.updatedAt! < b.updatedAt! ? 1 : -1));
  return projects.slice(0, 5);
}

export default function HomePage() {
  const [user, setUser] = React.useState(BlankUser);
  const [projects, setProjects] = React.useState<Project[]>([]);
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
      <br />
      <br />
      <Typography variant="h5">Recent projects</Typography>
      <br />
      <Box sx={{ px: 12, mx: 12 }}>
        <ProjectList projects={getRecentProjects(projects)} setProjects={setProjects} />
      </Box>
    </div>
  );
}
