import React from 'react';
import { Typography, Grid, Paper, Avatar, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import backgroundTop from '../assets/background_top.png';
import backgroundBot from '../assets/background_bot.png';
import project1 from '../assets/project_example1.png';
import logo from '../assets/logo.png';

export default function LandingPage() {
  const elevation = 12;

  return (
    <>
      <Typography
      // sx={{ backgroundColor: '#3087d1' }}
      >
        <img src={backgroundTop} style={{ opacity: 0.7, maxWidth: '100%' }}></img>
        <Typography
          sx={{
            padding: 5,
            paddingBottom: 10,
            paddingRight: 20,
            paddingLeft: 20
          }}>
          <Avatar
            src={logo}
            sx={{
              width: 500,
              height: 500,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: 5
            }}></Avatar>

          <Grid container rowSpacing={5} columns={12} columnSpacing={{ xs: 6, sm: 10, md: 5 }}>
            <Grid item xs={12}>
              <Paper elevation={0}>
                <Typography
                  variant="h1"
                  sx={{
                    padding: 2
                  }}>
                  Welcome to TaskTree!
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={4}>
              <Paper elevation={elevation} sx={{ minHeight: 500, padding: 4 }}>
                <Typography variant="h3">What is TaskTree?</Typography>
                <hr />
                <p style={{ fontSize: '30px' }}>
                  TaskTree is a productivity manager that allows anyone to gain more control over
                  their everyday activities!
                </p>
                <br />
                <Avatar
                  src={logo}
                  sx={{
                    width: 150,
                    height: 150,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginBottom: 5
                  }}></Avatar>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={elevation} sx={{ minHeight: 500, padding: 4 }}>
                <Typography variant="h3">How do I use it?</Typography>
                <hr />
                <p style={{ fontSize: '26px' }}>
                  Catagorize your multiple projects and add subtasks that allow you to focus on what
                  is important. Simply click on a new project and add as many subtasks as you need.
                </p>
                <img style={{ width: '100%' }} src={project1}></img>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={elevation} sx={{ minHeight: 500, padding: 4 }}>
                <Typography variant="h3">Getting Started</Typography>
                <hr />
                <p style={{ fontSize: '24px' }}>
                  Use the links below or the navigation buttons at the top of the screen to start
                  your TaskTree journey.
                </p>
                <br />
                <Typography sx={{ fontSize: 30 }}>
                  Need an account?
                  <br />
                  <Link
                    className="existingUser"
                    href="/SignUp"
                    variant="body2"
                    sx={{ fontSize: 24 }}>
                    Sign Up
                  </Link>
                </Typography>
                <br />
                <br />
                <Typography sx={{ fontSize: 30 }}>
                  Already an existing user?
                  <br />
                  <Link
                    className="existingUser"
                    href="/Login"
                    variant="body2"
                    sx={{ fontSize: 24 }}>
                    Login
                  </Link>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Typography>
        <img src={backgroundBot} style={{ opacity: 0.7, maxWidth: '100%' }}></img>
      </Typography>
    </>
  );
}
