import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Task from '../../types/Task';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { Alert, Box, ListItem, Snackbar } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import TaskService from '../../services/TaskService';
import EditTaskDialog from '../EditTaskDialog';
import CreateTaskDialog from '../CreateTaskDialog';

interface GetTaskFormProps {
  task: Task;
}

interface ProgressBarProps extends LinearProgressProps {
  task: Task;
}

function LinearProgressWithLabel(props: ProgressBarProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          variant="determinate"
          color={props.task.completedAt ? 'success' : 'primary'}
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.task.progress
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function IconGrid(
  props: GetTaskFormProps & {
    setOpenSnackbar: (e: boolean) => void;
    setOpenEdit: (e: boolean) => void;
    setOpenCreate: (e: boolean) => void;
  }
) {
  return (
    <Grid xs={2} container justifyContent="center">
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          props.setOpenCreate(true);
        }}>
        <AddIcon />
      </IconButton>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          props.setOpenEdit(true);
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
              props.setOpenSnackbar(true);
            }
          }}>
          <DeleteIcon />
        </IconButton>
      )}
    </Grid>
  );
}

export default function TaskListItem(props: GetTaskFormProps) {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);

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
            <Grid xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (
                    confirm(`Mark task "${props.task.name}" and all of its sub-tasks as complete?`)
                  ) {
                    props.task.completedAt = new Date();
                    TaskService.updateTask(props.task, props.task.id!);
                  }
                }}>
                {props.task.completedAt && (
                  <CheckCircleIcon color={props.task.completedAt ? 'success' : 'primary'} />
                )}
                {!props.task.completedAt && (
                  <CheckCircleOutlineIcon color={props.task.completedAt ? 'success' : 'primary'} />
                )}
              </IconButton>
              <Typography
                sx={{
                  textDecoration: props.task.completedAt ? 'line-through' : '',
                  color: props.task.completedAt ? 'gray' : ''
                }}
                variant="h6">
                {props.task.name}
              </Typography>
            </Grid>
            <Grid xs={8}>
              <LinearProgressWithLabel variant="determinate" task={props.task} />
            </Grid>
            {props.task.completedAt && <Grid xs={2} container justifyContent="center"></Grid>}
            {!props.task.completedAt && (
              <IconGrid
                task={props.task}
                setOpenSnackbar={setOpenSnackbar}
                setOpenEdit={setOpenEdit}
                setOpenCreate={setOpenCreate}
              />
            )}
          </Grid>
        </ListItemText>
      </ListItemButton>

      <EditTaskDialog
        open={openEdit}
        task={props.task}
        onClose={() => setOpenEdit(false)}
        onSubmit={(formData) => {
          setOpenEdit(false);
          TaskService.updateTask(formData, props.task.id!);
        }}
      />

      <CreateTaskDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSubmit={(formData) => {
          setOpenCreate(false);
          TaskService.createTask(formData, props.task.id!);
        }}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Task successfully deleted">
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Task successfully deleted
        </Alert>
      </Snackbar>
    </ListItem>
  );
}
