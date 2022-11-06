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
import { Alert, Box, Button, ListItem, ListItemIcon, ListItemSecondaryAction, Snackbar } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import TaskService from '../../services/TaskService';
import EditTaskDialog from '../EditTaskDialog';

interface GetTaskFormProps {
  task: Task;
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function TaskListItem(props: GetTaskFormProps) {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText disableTypography>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid xs="auto" sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  // do other stuff here
                }}>
                <CheckCircleOutlineIcon />
              </IconButton>
              <Typography variant="h6">{props.task.name}</Typography>
            </Grid>
            <Grid xs={6}>
              <LinearProgressWithLabel variant="determinate" value={props.task.progress} />
            </Grid>
            <Grid xs="auto">
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
                  setOpenEdit(true);
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
                      setOpenSnackbar(true);
                    }
                  }}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </ListItemText>
      </ListItemButton>

      <EditTaskDialog 
        open={openEdit}
        task={props.task}
        onClose={() => setOpenEdit(false)}
        onSubmit={(formData) => {
          console.log(formData);
          setOpenEdit(false);
          props.task.name = formData.name;
          props.task.description = formData.description;
          props.task.weight = formData.weight;
          TaskService.updateTask(props.task, props.task.id!);
        }}
      />

      <Snackbar 
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Task successfully deleted"
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>Task successfully deleted</Alert>
      </Snackbar>
    </ListItem>
  );
}
