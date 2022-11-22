import React, { FormEvent, useState } from 'react';
import { TextField, Button, Link, Typography } from '@mui/material';
import AuthService from '../services/AuthService';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCurrentUser } from '../store/user';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';

export default function LoginDesktop() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await UserService.authenticateUser(username, password);
    AuthService.storeJWT(token);
    const user = AuthService.decodeJWT(token);
    dispatch(setCurrentUser(user));
    navigate('/');
  };

  return (
    <Typography sx={{ marginTop: 6 }}>
      <Typography component="h1" variant="h5">
        Account Log In
      </Typography>
      <br />
      <form onSubmit={handleSubmit}>
        <TextField
          id="userIn"
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          placeholder="Username"
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
          placeholder="Password"
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
          type='submit'
          sx={{
            width: 500,
            color: 'white',
            backgroundColor: '#1565c0'
          }}>
          Log In
        </Button>
        <br />
        <br />

        <Typography id="signUpDiv">
          Don't have an account? &nbsp;
          <Link className="existingUser" href="/SignUp" variant="body2">
            Sign Up
          </Link>
        </Typography>
      </form>
    </Typography>
  );
}
