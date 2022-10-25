import React from 'react';
import { AppBar, Avatar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Props } from './TTNavBarBase';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useLocation } from 'react-router-dom';

export default function TTNavBarDesktop(props: Props) {
  const location = useLocation();
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="static" elevation={0} color="transparent">
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <Avatar variant="rounded" alt="tasktree logo" src={logo} sx={{ mr: 2 }} />
            <Typography
              variant="h6"
              sx={{
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                flexGrow: 1
              }}>
              TaskTree
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {props.navItems.map((item) =>
                item.path ? (
                  <Button
                    key={item.name}
                    sx={{ my: 2, display: 'block' }}
                    component={Link}
                    to={item.path!}
                    variant={item.path === location.pathname ? 'contained' : 'text'}>
                    {item.name}
                  </Button>
                ) : (
                  <Button key={item.name} sx={{ my: 2, display: 'block' }} onClick={item.action}>
                    {item.name}
                  </Button>
                )
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
