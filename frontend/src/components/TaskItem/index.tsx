import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Task from '../../types/Task';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { Box, ListItem } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import TaskService from '../../services/TaskService';
import EditTaskDialog from '../EditTaskDialog';
import CreateTaskDialog from '../CreateTaskDialog';
import { useAppDispatch } from '../../store/hooks';
import { showSnackbar } from '../../store/snackbar';
import shallowEqual from '../../util/object-equality';

interface TaskListItemProps {
  task: Task;
  children?: React.ReactNode;
  onClick?: (e: React.SyntheticEvent) => void;
  reloadProject: () => void;
  sx?: any;
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
          value={props.task.progress}
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
  props: TaskListItemProps & {
    setSnackbarOpen: (e: boolean) => void;
    setCreateDialogOpen: (e: boolean) => void;
    setEditDialogOpen: (e: boolean) => void;
    reloadProject: () => void;
    dispatch: any;
  }
) {
  return (
    <Grid xs={2} container justifyContent="center">
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          props.setCreateDialogOpen(true);
        }}>
        <AddIcon />
      </IconButton>
      {props.task.projectId == null && (
        <>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              props.setEditDialogOpen(true);
            }}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (confirm(`Are you sure you want to delete task "${props.task.name}"?`)) {
                TaskService.deleteTask(props.task.id!).then(() => {
                  props.reloadProject();
                  props.dispatch(
                    showSnackbar({ message: 'Task deleted successfully', severity: 'success' })
                  );
                });
                props.setSnackbarOpen(true);
              }
            }}>
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </Grid>
  );
}

export default function TaskListItem(props: TaskListItemProps) {
  const dispatch = useAppDispatch();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [preEditTask, setPreEditTask] = React.useState(props.task);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <>
      <ListItem button={!!props.onClick as false} onClick={props.onClick}>
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
                    TaskService.updateTask(props.task, props.task.id!).then(() => {
                      props.reloadProject();
                      dispatch(
                        showSnackbar({
                          message: 'Task completed successfully',
                          severity: 'success'
                        })
                      );
                    });
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
                setSnackbarOpen={setOpenSnackbar}
                setCreateDialogOpen={setOpenCreate}
                setEditDialogOpen={setOpenEdit}
                reloadProject={props.reloadProject}
                dispatch={dispatch}
              />
            )}
          </Grid>
        </ListItemText>

        {props.children}
      </ListItem>
      <EditTaskDialog
        open={openEdit}
        task={props.task}
        onClose={() => setOpenEdit(false)}
        onSubmit={(formData) => {
          setOpenEdit(false);
          if (!shallowEqual(formData, preEditTask)) {
            TaskService.updateTask(formData, props.task.id!).then(() => {
              props.reloadProject();
            });
            dispatch(showSnackbar({ message: 'Task updated successfully', severity: 'success' }));
            setPreEditTask(formData);
          }
        }}
      />

      <CreateTaskDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSubmit={(formData) => {
          TaskService.createTask(formData, props.task.id!).then(() => {
            props.reloadProject();
            dispatch(showSnackbar({ message: 'Task created successfully', severity: 'success' }));
          });
          setOpenCreate(false);
        }}
      />
    </>
  );
}
