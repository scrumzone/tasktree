import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import React, { FormEvent, useState } from 'react';
import './signup.css';

interface stateInterface {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  submitFlag: boolean;
}

export default function SignUpDesktop() {
  const [values, setValues] = useState<stateInterface>({} as stateInterface);

  /* Generic way of using setters for state values so that one onChange can be used for
   * all values in the stateInterface */
  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setValues((values) => ({ ...values, [target.name]: target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateFields()) {
      // create the user here

      window.location.pathname = '';
    } else {
      return;
    }
  };

  const validateFields = () => {
    setValues((values) => ({ ...values, ['submitFlag']: true }));
    let isValid = true;

    // makes sure required fields are populated
    if (!values.username) {
      setValues((values) => ({ ...values, ['username']: '' }));
      isValid = false;
    }

    if (!values.password) {
      setValues((values) => ({ ...values, ['password']: '' }));
      isValid = false;
    }

    if (!values.confirmPassword) {
      setValues((values) => ({ ...values, ['confirmPassword']: '' }));
      isValid = false;
    }

    // makes sure passwords match
    if (values.password !== values.confirmPassword) {
      isValid = false;
    }

    return isValid;
  };

  return (
    <div>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={(e) => handleSubmit(e)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                onChange={onChange}
                error={values.username === ''}
                helperText={values.username === '' ? 'Required' : ''}
                value={values.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={onChange}
                error={values.password === ''}
                helperText={values.password === '' ? 'Required' : ''}
                value={values.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                onChange={onChange}
                error={
                  values.confirmPassword === '' ||
                  (values.password !== values.confirmPassword && values.submitFlag)
                }
                helperText={
                  values.confirmPassword === ''
                    ? 'Required'
                    : values.password !== values.confirmPassword && values.submitFlag
                    ? 'Passwords do not match'
                    : ''
                }
                value={values.confirmPassword}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid
              item
              sx={{
                display: 'flex',
                flexDirection: 'row'
              }}>
              <Typography variant="body2">Already have an account? &nbsp;</Typography>
              <Link className="existingUser" href="/login" variant="body2">
                Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
