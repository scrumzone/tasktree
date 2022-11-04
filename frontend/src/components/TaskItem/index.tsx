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
