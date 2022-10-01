import React from 'react';
import logo from '../assets/logo.png';
import { Button, Typography } from '@mui/material';
import UserService from '../services/UserService';
import User from '../types/User';

class HomePage extends React.Component {
  user: User;

  constructor() {
    super({});

    this.user = { id: 0, username: '' };

    UserService.getUser(1).then((user) => {
      this.user = user;
      console.log(this.user);
    });
  }

  render() {
    return (
      <div>
        <Typography variant="h1">HOME PAGE</Typography>
        <Button>Hello World</Button>
        <Typography variant="h2">{this.user.username}</Typography>
      </div>
    );
  }
}

export default HomePage;
