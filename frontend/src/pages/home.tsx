import React from 'react';
import logo from '../assets/logo.png';
import { Button, Typography } from '@mui/material';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Typography variant="h1">HOME PAGE</Typography>
        <Button>Hello World</Button>
      </div>
    );
  }
}

export default HomePage;
