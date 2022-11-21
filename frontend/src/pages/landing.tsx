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
      
      <Typography sx={{backgroundColor: '#42a1a1'}}>
        
        <img src={backgroundTop} style={{opacity:0.7}}></img>
        <Typography 
          sx={{
            padding:5,
            paddingLeft:5,
            paddingRight:5,
          }}>
            {/* <Avatar src={logo} sx={{alignSelf:'center', width:300, height:300}}></Avatar> */}
            
          <Grid container 
                rowSpacing={5} 
                columns={1} 
                columnSpacing={{ xs: 6, sm: 10, md: 10 }}>
            <Grid item xs={6}>
              <Item>
              <Typography 
                variant='h2' 
                sx={{
                  padding:2,
                  // fontWeight:'bold',
                }}> TaskTree </Typography>
              </Item>
            </Grid>

            <Grid item xs={6}>
              <Item sx={{height:400, padding:2}}>
                <Typography variant='h5'>Who are we?</Typography>
                <p style={{fontSize:'14px'}}>
                  TaskTree is an application that allows a user to... </p>
              </Item>
            </Grid>
          </Grid>
        </Typography>
        <img src={backgroundBot} style={{opacity:0.7}}></img>
      </Typography>
    </>
  );
}
