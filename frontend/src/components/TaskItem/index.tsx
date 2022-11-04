/*
import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Task from '../../types/Task';
import ListItemText from '@mui/material/ListItemText'
import LinearProgress from '@mui/material/LinearProgress'
import Grid from '@mui/material/Grid'

interface GetTaskFormProps{
    task: Task;
}  

export default function TaskListItem(props: GetTaskFormProps) {
  return (
    <Stack direction="row" spacing={5}>
      <ListItemButton>
        <Grid xs={3}>
        <IconButton>
            <CheckCircleOutlineIcon />
        </IconButton>
        <Typography>
            <ListItemText primary={props.task.name} />
        </Typography>
        </Grid>
        <Grid xs={6}>
          <LinearProgress variant="determinate" value={props.task.progress} />
          <Typography>
            {props.task.progress}%
          </Typography>
        </Grid>
        <Grid xs={3}>
        <IconButton>
            <AddIcon />
        </IconButton>
        <IconButton>
            <EditIcon />
        </IconButton>
        {props.task.projectId == null &&
            <IconButton>
                <DeleteIcon />
            </IconButton>
        }
        </Grid>
      </ListItemButton>
    </Stack>
  );
}
*/
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
import { Box, ListItem, ListItemIcon, ListItemSecondaryAction } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

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
                  // do other stuff here
                }}>
                <EditIcon />
              </IconButton>
              {props.task.projectId == null && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    // do other stuff here
                  }}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
}
