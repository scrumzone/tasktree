import { Alert, Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import React, { FormEvent, useState } from 'react';
import AuthService from '../../services/AuthService';
import UserService from '../../services/UserService';
import User from '../../types/User';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { setCurrentUser } from '../../store/user';

interface stateInterface {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  submitFlag: boolean;
  passwordLength: number;
  errorText: string;
}

export default function SignUpComponent() {
  const [values, setValues] = useState<stateInterface>({} as stateInterface);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /* Generic way of using useStates for state values so that one onChange can be used for
   * all values in the stateInterface */
  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setValues((values) => ({ ...values, [target.name]: target.value }));
    if (target.name === 'password')
      setValues((values) => ({ ...values, ['passwordLength']: values.password.length }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValues((values) => ({ ...values, ['submitFlag']: true }));

    if (validateFields()) {
      const user: User = {
        firstName: values.firstName,
        lastName: values.lastName || undefined,
        username: values.username,
        password: values.password
      };
      // Creates the user
      const res = await UserService.createUser(user);
      if (res.status != 201) {
        displayError(res.data);
        return;
      }

      // Authenticates the user and redirects to homepage
      const jwt: string = await UserService.authenticateUser(values.username, values.password);
      AuthService.storeJWT(jwt);
      dispatch(setCurrentUser(user));
      navigate('/');
    } else {
      return;
    }
  };

  const displayError = (errorMessage: string) => {
    setValues((values) => ({ ...values, ['errorText']: errorMessage }));
  };

  const validateFields = () => {
    let isValid = true;

    // makes sure required fields are populated
    if (!values.firstName) {
      setValues((values) => ({ ...values, ['firstName']: '' }));
      isValid = false;
    }

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

    // makes sure password is 8+ characters
    if (values.passwordLength < 8) {
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
        {values.errorText && values.errorText.length > 0 && (
          <Box>
            <br />
            <Alert severity="error">{values.errorText}</Alert>
          </Box>
        )}
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
                required
                onChange={onChange}
                error={values.firstName === ''}
                helperText={values.firstName === '' ? 'Required' : ''}
                value={values.firstName}
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
                error={values.password === '' || (values.passwordLength < 8 && values.submitFlag)}
                helperText={
                  values.password === ''
                    ? 'Required'
                    : values.passwordLength < 8 && values.submitFlag
                    ? 'Password must be at least 8 characters'
                    : ''
                }
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
