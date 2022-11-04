import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Project from '../../types/Project';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { Box, ListItem, ListItemIcon, ListItemSecondaryAction } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

interface GetProjectFormProps {
  project: Project;
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

export default function ProjectListItem(props: GetProjectFormProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText disableTypography>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6">{props.project.name}</Typography>
            </Grid>
            <Grid xs={6}>
              <LinearProgressWithLabel variant="determinate" value={props.project.progress} />
            </Grid>
            <Grid xs="auto">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  // do other stuff here
                }}>
                <EditIcon />
              </IconButton>
              
              <IconButton
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();                    // do other stuff here
                }}>
                <DeleteIcon />
              </IconButton>
              
            </Grid>
          </Grid>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
}