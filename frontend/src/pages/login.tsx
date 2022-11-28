import React, { FormEvent, useState } from 'react';
import { TextField, Button, Link, Typography, Box, Alert } from '@mui/material';
import AuthService from '../services/AuthService';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCurrentUser } from '../store/user';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';

export default function LoginDesktop() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || !username) return;

    try {
      const token = await UserService.authenticateUser(username, password);
      AuthService.storeJWT(token);
      const user = AuthService.decodeJWT(token);
      dispatch(setCurrentUser(user));
      navigate('/');
    } catch (err) {
      setErrorText('Incorrect username or password. Please try again.');
    }
  };

  return (
    <Typography sx={{ marginTop: 6 }}>
      <Typography component="h1" variant="h5">
        Account Log In
      </Typography>
      <br />
      <Box
        component="form"
        noValidate
        onSubmit={(e) => handleSubmit(e)}
        sx={{ width: 800, marginLeft: 'auto', marginRight: 'auto' }}>
        <TextField
          id="userIn"
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          label="Username"
          autoFocus
          required
          sx={{
            width: 500,
            height: 15,
            marginBottom: 5
          }}
        />
        <br />
        <br />

        <TextField
          id="passIn"
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          type="password"
          label="Password"
          autoFocus
          required
          sx={{
            width: 500,
            height: 15,
            marginBottom: 5
          }}
        />
        <br />
        <br />

        <Button
          id="loginBtn"
          variant="contained"
          type="submit"
          sx={{
            width: 500,
            color: 'white'
          }}>
          Log In
        </Button>
        <br />
        <br />

        <Typography>
          Don't have an account? &nbsp;
          <Link className="existingUser" href="/SignUp" variant="body2">
            Sign Up
          </Link>
        </Typography>
        {errorText && errorText.length > 0 && (
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <br />
            <Alert sx={{ width: 475, marginLeft: 'auto', marginRight: 'auto' }} severity="error">
              {errorText}
            </Alert>
          </Box>
        )}
      </Box>
    </Typography>
  );
}
