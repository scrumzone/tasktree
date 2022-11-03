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
import CreateProjectDialog from '../CreateProjectDialog';

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
  const [formData, setFormData] = React.useState<Project>({
    name: '',
    description: '',
    progress: 0
  });

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
      <CreateProjectDialog open={open} onClose={handleClose} onSubmit={handleSubmit} />
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
