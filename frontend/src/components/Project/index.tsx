import './project.css';

import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

export default function NestedList() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Tasks
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Expand All" />
      </ListItemButton>
      <ListItemButton >
        <ListItemText primary="Task 1" />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Task 1-1" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton >
        <ListItemText primary="Task 2" />
      </ListItemButton>
      <ListItemButton >
        <ListItemText primary="Task 3" />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Task 3-1" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
