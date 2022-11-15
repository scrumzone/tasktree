import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Project from '../../types/Project';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { Alert, Box, ListItem, Snackbar } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import EditTaskDialog from '../EditTaskDialog';

interface GetProjectFormProps {
  project: Project;
}

export default function ProjectHeader(props: GetProjectFormProps) {

  return (
    <Typography component="h3" variant="h3"
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
      }}>
        <Typography align='left'
          component="h3"
          variant="h3"
          sx={{
            justifySelf: 'left',
            marginRight: 'auto',
            marginLeft: '30px'
          }}>
          {props.project.name}
        </Typography>

        <Typography align='center'
          component="h3"
          variant="h3"
          sx={{
            justifySelf: 'center',
            
            marginRight: 'auto'
          }}>
          {Math.round(props.project.progress)}% completed
        </Typography>
      </Typography>
  );
}