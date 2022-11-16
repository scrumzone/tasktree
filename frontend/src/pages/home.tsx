import React from 'react';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { BlankUser } from '../types/User';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Project from '../types/Project';
import ProjectService from '../services/ProjectService';
import ProjectList from '../components/ProjectList';

function getRecentProjects(projects: Project[]) {
  projects = projects.filter((project) => (project.progress < 100 ? true : false));
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
    <>
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
        {projects.length > 0 ? (
          <ProjectList projects={getRecentProjects(projects)} setProjects={setProjects} />
        ) : (
          <Grid container spacing={2} sx={{ direction: 'row', justifyContent: 'center' }}>
            {Array(4).fill(
              <Grid item xs={12}>
                <Skeleton variant="rounded" height={64} />
              </Grid>
            )}
          </Grid>
        )}
      </Box>
    </>
  );
}
