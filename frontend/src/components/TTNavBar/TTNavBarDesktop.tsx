import React from 'react';
import { AppBar, Avatar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Props } from './TTNavBarBase';
import logo from '../../assets/logo.png';

export default function TTNavBarDesktop(props: Props) {
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
              {props.navItems.map((item) => (
                <Button
                  key={item.path}
                  href={item.path}
                  sx={{ my: 2, display: 'block' }}
                  variant={item.path === location.pathname ? 'contained' : 'text'}>
                  {item.name}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
