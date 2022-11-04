//import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
//import React, { FormEvent, useState } from 'react';
//import User from '../../types/User';

import * as React from 'react';
//import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import { AddCircle, Edit, Delete } from '@mui/icons-material';
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
import EditProjectDialog from '../EditProjectDialog';
import './display.css';

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const [open, setOpen] = React.useState(false);
  const [projects, setProjects] = React.useState<Project[]>([BlankProject]);
  const [formData, setFormData] = React.useState<Project>({
    name: '',
    description: '',
    progress: 0
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (data: Project) => {
    const project = await ProjectService.createProject(data);
    setProjects([...projects, project]);
    handleClose();
  };

  return (
    <ListItem style={style} key={data[index].name} component="a" disablePadding>
      <ListItemButton>
        <ListItemText primary={data[index].name} />
        <ListItemText primary={data[index].progress} />
        <IconButton><Edit onClick={handleClickOpen}></Edit></IconButton>
        <IconButton><Delete></Delete></IconButton>
      </ListItemButton>
      <EditProjectDialog open={open} onClose={handleClose} onSubmit={handleSubmit} />
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
    <Box className='boxWrapper1'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      
      <Box className='boxWrapper2'>
        <Typography id="listHead" component="h4" variant="h4">
          Projects 
        </Typography>
        <Button variant="outlined" onClick={handleClickOpen}>
            Create new project
        </Button>
        <hr></hr>
        <CreateProjectDialog open={open} onClose={handleClose} onSubmit={handleSubmit} />
        <FixedSizeList
          height={800}
          width={1200}
          itemSize={46}
          itemCount={projects.length}
          overscanCount={5}
          itemData={projects}>
          {renderRow}
        </FixedSizeList>
      </Box>
    </Box>
  );
}
