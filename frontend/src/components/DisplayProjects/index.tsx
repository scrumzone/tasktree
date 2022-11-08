import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Box, Button, Typography, Snackbar, Alert } from '@mui/material';
import ProjectService from '../../services/ProjectService';
import Project, { BlankProject } from '../../types/Project';
import CreateProjectDialog from '../CreateProjectDialog';
import ProjectListItem from '../ProjectItem';
import ProjectList from '../ProjectList';

export default function VirtualizedList() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [open, setOpen] = React.useState(false);
  const [openDel, setOpenDel] = React.useState(false);
  const [formData, setFormData] = React.useState<Project>({
    name: '',
    description: '',
    progress: 0
  });

  function renderRow(props: ListChildComponentProps) {
    const { data, index, style } = props;

    function onEditSubmit(formData: Project) {
      data[index].name = formData.name;
      data[index].description = formData.description;
      ProjectService.updateProject(data[index], data[index].id!);
    }

    function onDelete() {
      ProjectService.deleteProject(data[index].id!);
      setProjects(projects.filter((project) => project != data[index]));
      setOpenDel(true);
    }

    return (
      <ListItem style={style}>
        <ProjectListItem onEditSubmit={onEditSubmit} onDelete={onDelete} project={data[index]} />
      </ListItem>
    );
  }

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

  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setFormData((formData) => ({ ...formData, [target.name]: target.value }));
  };

  const handleSubmit = async (data: Project) => {
    const project = await ProjectService.createProject(data);
    setProjects([...projects, project]);
    handleClose();
  };

  // handle close for delete
  const handleDelClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenDel(false);
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
