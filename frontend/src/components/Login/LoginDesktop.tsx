import React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import './login.css';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function LoginDesktop() {
    return (
        <div id="wrapper1">
            <div id="loginField">
                <h1>Account Log In</h1>
                <form>
                <TextField id="userIn" variant="outlined" placeholder='Username'></TextField><br/><br/>
                <TextField id="passIn" variant="outlined" placeholder='Password'></TextField>
                <Button id="loginBtn" variant="contained">Log In</Button>
                </form>
            </div>
        </div>
    );
}

