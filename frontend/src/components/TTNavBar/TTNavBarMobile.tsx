import React from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Divider,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import { Props } from './TTNavBarBase';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const drawerWidth = 240;

export default function TTNavBarMobile(props: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const drawer = (
    <Box onClick={toggleDrawer} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '.3rem' }}>
        TaskTree
      </Typography>
      <Divider />
      <List>
        {props.navItems.map((item) =>
          item.path ? (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                sx={{ textAlign: 'center' }}
                component={Link}
                to={item.path}
                selected={item.path === location.pathname}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                sx={{ textAlign: 'center' }}
                onClick={(e) => {
                  item.action!(e, navigate);
                }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="static" elevation={0} color="transparent">
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <Avatar variant="rounded" alt="tasktree logo" src={logo} sx={{ mr: 2 }} />
            <Typography
              variant="h6"
              sx={{
                display: { xs: 'flex', md: 'none' },
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                flexGrow: 1
              }}>
              TaskTree
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer}
              color="inherit">
              <Icon>menu</Icon>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}>
        {drawer}
      </Drawer>
    </Box>
  );
}
