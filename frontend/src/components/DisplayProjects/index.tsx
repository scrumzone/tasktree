//import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
//import React, { FormEvent, useState } from 'react';
//import User from '../../types/User';
import './displayProjects.css';

import * as React from 'react';
//import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="a" disablePadding href="/displayProjects">
      <ListItemButton>
        <ListItemText primary={`Project ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

export default function VirtualizedList() {
  return (
    <Box
      //sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <Typography component="h1" variant="h5">
        Projects
      </Typography>
      <button> Create New Project </button>
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={200}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}