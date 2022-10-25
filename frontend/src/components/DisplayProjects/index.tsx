//import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
//import React, { FormEvent, useState } from 'react';
//import User from '../../types/User';
import * as React from 'react';
//import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="a" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Project ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

export default function VirtualizedList() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    console.log('clucked');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      //sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
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
      <FixedSizeList height={400} width={360} itemSize={46} itemCount={200} overscanCount={5}>
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}