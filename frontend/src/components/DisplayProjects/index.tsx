//import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
//import React, { FormEvent, useState } from 'react';
//import User from '../../types/User';
import * as React from 'react';
//import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Box, Button, TextField, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ProjectService from '../../services/ProjectService';
import Project, { BlankProject } from '../../types/Project';

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;

  return (
    <ListItem style={style} key={data[index].name} component="a" disablePadding>
      <ListItemButton>
        <ListItemText primary={data[index].name} />
        <ListItemText primary={data[index].progress} />
      </ListItemButton>
    </ListItem>
  );
}

export default function VirtualizedList() {
  const [open, setOpen] = React.useState(false);
  const [projects, setProjects] = React.useState<Project[]>([BlankProject]);

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

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <Typography component="h5" variant="h5">
        Projects
      </Typography>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create new project
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project Name"
            type="project"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Confirm</Button>
        </DialogActions>
      </Dialog>
      <FixedSizeList 
        height={400} 
        width={360} 
        itemSize={46} 
        itemCount={projects.length} 
        overscanCount={5}
        itemData={projects}>
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
