import React from 'react';
import { Button, Typography } from '@mui/material';
import UserService from '../services/UserService';
import User, { BlankUser } from '../types/User';
import removeJWT from '../services/authService';

function logout(){
  removeJWT("access_token");
  window.location.replace("/");
}

interface HomePageState {
  user: User;
}

class HomePage extends React.Component<{}, HomePageState> {
  state: HomePageState = {
    user: BlankUser,
  };

  constructor(props: {}) {
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
        <Typography variant="h2">
          Hello, {this.state.user.firstName}.
        </Typography>
        <Button onClick={() => logout()}>Logout Button</Button>
      </div>
    );
  }
}

export default HomePage;
