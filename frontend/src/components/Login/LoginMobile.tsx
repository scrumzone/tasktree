import React, { useState } from 'react';
import { TextField, Button, Link, Typography } from '@mui/material';
import './login.css';
import AuthService from '../../services/AuthService';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCurrentUser } from '../../store/user';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';

export default function LoginMobile() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    const token = await UserService.authenticateUser(username, password);
    AuthService.storeJWT(token);
    const user = AuthService.decodeJWT(token);
    dispatch(setCurrentUser(user));
    navigate('/');
  };

  return (
    <div id="wrapper1">
      <div id="loginField">
        <h1>Account Log In</h1>
        <form>
          <TextField
            id="userIn"
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            placeholder="Username"></TextField>
          <br />
          <br />
          <TextField
            id="passIn"
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            type="password" 
            placeholder="Password"></TextField>
          <Button id="loginBtn" onClick={onSubmit} variant="contained">
            Log In
          </Button><br></br><br></br>
          
          <Typography id="signUpDiv">
            Don't have an account? &nbsp;
            <Link className="existingUser" href="/SignUp" variant="body2">
                Sign Up
            </Link>
          </Typography>
        </form>
      </div>
    </div>
  );
}
