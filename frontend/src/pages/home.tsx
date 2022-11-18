import React from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
import { BlankUser } from '../types/User';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Project, { BlankProject } from '../types/Project';
import ProjectService from '../services/ProjectService';
import ProjectList from '../components/ProjectList';

function getRecentProjects(projects: Project[]) {
  projects = getOpenProjects(projects);
  projects.sort((a, b) => (a.updatedAt! < b.updatedAt! ? 1 : -1));
  return projects.slice(0, 5);
}

function getOpenProjects(projects: Project[]) {
  return projects.filter((project) => (project.progress < 100 ? true : false));
}

function displayProjects(projects: Project[], setProjects: (e: Project[]) => void) {
  /* projects are still loading */
  if (projects[0] === BlankProject) {
    return (
      <Skeleton
        variant="rounded"
        sx={{ width: '500px', height: '42px', margin: 'auto', marginTop: '10px' }}
      />
    );
  }

  /* no projects */
  if (projects.length === 0) {
    return <Typography variant="h4">You have no projects.</Typography>;
  }

  /* no open projects */
  if (getOpenProjects(projects).length === 0) {
    return <Typography variant="h4">You have no open projects.</Typography>;
  }

  /* some open projects */
  return (
    <>
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
    </>
  );
}

export default function HomePage() {
  const [user, setUser] = React.useState(BlankUser);
  const [projects, setProjects] = React.useState<Project[]>([BlankProject]);
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
    <>
      <Typography variant="h1">Hello, {user.firstName}!</Typography>
      {displayProjects(projects, setProjects)}
    </>
  );
}
