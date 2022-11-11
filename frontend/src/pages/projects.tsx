import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Box, Button, Typography, Snackbar, Alert } from '@mui/material';
import ProjectService from '../services/ProjectService';
import Project, { BlankProject } from '../types/Project';
import CreateProjectDialog from '../components/CreateProjectDialog';
import ProjectListItem from '../components/ProjectItem';
import ProjectList from '../components/ProjectList';
import { showSnackbar } from '../store/snackbar';
import { useAppDispatch } from '../store/hooks';

export default function ProjectsPage() {
  const dispatch = useAppDispatch();
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchProjects = async () => {
      setProjects(await ProjectService.getProjects());
    };
    fetchProjects();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (data: Project) => {
    const project = await ProjectService.createProject(data);
    setProjects([...projects, project]);
    handleClose();
    dispatch(showSnackbar({ message: 'Project created successfully', severity: 'success' }));
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'space-between',
          width: '100%',
          padding: '10px',
          paddingBottom: '20px',
          borderBottom: '1px solid darkgrey',
          marginBottom: '10px'
        }}>
        <Typography
          component="h4"
          variant="h4"
          sx={{
            justifySelf: 'left',
            marginLeft: '30px'
          }}>
          Projects
        </Typography>

        <Button
          variant="outlined"
          onClick={handleClickOpen}
          sx={{
            justifySelf: 'right',
            marginLeft: 'auto',
            marginRight: '30px'
          }}>
          Create new project
        </Button>
      </Box>

      <CreateProjectDialog open={open} onClose={handleClose} onSubmit={handleSubmit} />

      <ProjectList projects={projects} setProjects={setProjects} />
    </Box>
  );
}