import React from 'react';
import { Typography, Grid, Paper, Avatar, } from '@mui/material';
import { styled } from '@mui/material/styles';
import backgroundTop from '../assets/background_top.png';
import backgroundBot from '../assets/background_bot.png';
import logo from '../assets/logo.png';
import background from '../assets/background1.png';
import { Opacity } from '@mui/icons-material';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  elevation: '3',
  textAlign: 'center',
}));

export default function LandingPage() {
  return (
    <>
      
      <Typography sx={{backgroundColor: '#3087d1'}}>
        
        <img src={backgroundTop} style={{opacity:0.7}}></img>
        <Typography 
          sx={{
            padding:5,
            paddingBottom:10,
            paddingRight:50,
            paddingLeft:50,
          }}>
          <Avatar 
            src={logo}
            sx={{
              width:500,
              height:500,
              marginLeft:'auto',
              marginRight:'auto',
              marginBottom:5,
            }}></Avatar>
            
          <Grid container 
                rowSpacing={5} 
                columns={12} 
                columnSpacing={{ xs: 6, sm: 10, md: 5 }}>

            <Grid item xs={12}>
              <Item>
              <Typography 
                variant='h3' 
                sx={{
                  padding:2,
                  // fontWeight:'bold',
                }}> TaskTree </Typography>
              </Item>
            </Grid>

            <Grid item xs={4}>
              <Item sx={{height:500, padding:2}}>
                <Typography variant='h4'>What is TaskTree?</Typography>
                <p style={{fontSize:'20px'}}>
                  TaskTree is an application that allows a user to... </p>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item sx={{height:500, padding:2}}>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item sx={{height:500, padding:2}}>
                <Typography variant='h3'>Getting Started</Typography>
              </Item>
            </Grid>
          </Grid>
        </Typography>
        <img src={backgroundBot} style={{opacity:0.7}}></img>
      </Typography>
    </>
  );
}
