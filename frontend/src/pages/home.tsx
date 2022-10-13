import React from 'react';
import { Button, Typography } from '@mui/material';
import UserService from '../services/UserService';
import User, { BlankUser } from '../types/User';

interface HomePageState {
  user: User;
}

class HomePage extends React.Component<Record<string, never>, HomePageState> {
  state: HomePageState = {
    user: BlankUser
  };

  constructor(props: Record<string, never>) {
    super(props);
  }

  componentDidMount() {
    UserService.getUser(1).then((user) => {
      this.setState({ user: user });
    });
  }

  render() {
    return (
      <div>
        <Typography variant="h1">HOME PAGE</Typography>
        <Button>Hello World</Button>
        <Typography variant="h2">Hello, {this.state.user.firstName}.</Typography>
      </div>
    );
  }
}

export default HomePage;
