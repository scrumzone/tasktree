import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './login.css';
import AuthService from '../../services/AuthService';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCurrentUser } from '../../store/user';
import { useNavigate } from 'react-router-dom';

export default function LoginDesktop() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    const token = await AuthService.signIn(username, password);
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
            placeholder="Password"></TextField>
          <Button id="loginBtn" onClick={onSubmit} variant="contained">
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
}
