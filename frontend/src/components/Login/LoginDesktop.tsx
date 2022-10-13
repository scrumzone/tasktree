import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './login.css';

export default function LoginDesktop() {
  return (
    <div id="wrapper1">
      <div id="loginField">
        <h1>Account Log In</h1>
        <form>
          <TextField id="userIn" variant="outlined" placeholder="Username"></TextField>
          <br />
          <br />
          <TextField id="passIn" variant="outlined" placeholder="Password"></TextField>
          <Button id="loginBtn" variant="contained">
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
}
