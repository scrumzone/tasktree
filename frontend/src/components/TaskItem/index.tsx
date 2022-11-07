import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Task from '../../types/Task';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { Alert, Box, Button, createTheme, ListItem, ListItemIcon, ListItemSecondaryAction, Snackbar, ThemeProvider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import TaskService from '../../services/TaskService';

interface GetTaskFormProps {
  task: Task;
}

const theme = createTheme({
  palette: {
    secondary: {
      main: "#34a853"
    }
  }
});

export default function TaskListItem(props: GetTaskFormProps) {
  const [open, setOpen] = React.useState(false);

  function LinearProgressWithLabel(progressProps: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
          <ThemeProvider theme={theme}>
            <LinearProgress variant="determinate" color={props.task.completedAt ? 'secondary' : 'primary'} {...progressProps}/>
          </ThemeProvider>
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
            progressProps.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText disableTypography>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid xs={2} sx={{ display: 'flex', alignItems: 'center', paddingLeft: props.task.completedAt ? '40px' : '0' }}>
              {!props.task.completedAt &&
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  // do other stuff here
                }}>
                <CheckCircleOutlineIcon />
              </IconButton>
              }
              <Typography 
                sx={{
                  textDecoration: props.task.completedAt ? 'line-through' : '',
                  color: props.task.completedAt ? 'gray' : ''
                }} 
                variant="h6">{props.task.name}
              </Typography>
            </Grid>
            <Grid xs={8}>
              <LinearProgressWithLabel variant="determinate" value={props.task.progress} />
            </Grid>
            {props.task.completedAt && <Grid xs={2} container justifyContent='center'></Grid>}
            {!props.task.completedAt &&
              <Grid xs={2} container justifyContent='center'>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  // do other stuff here
                }}>
                <AddIcon />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  // do other stuff here
                }}>
                <EditIcon />
              </IconButton>
              {props.task.projectId == null && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (confirm(`Are you sure you want to delete task "${props.task.name}"?`)) {
                      TaskService.deleteTask(props.task.id!);
                      setOpen(true);
                    }
                  }}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Grid>
            }
          </Grid>
        </ListItemText>
      </ListItemButton>
      <Snackbar 
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Task successfully deleted"
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>Task successfully deleted</Alert>
      </Snackbar>
    </ListItem>
  );
}
