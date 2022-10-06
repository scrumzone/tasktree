import React from 'react';
import LoginDesktop from './LoginDesktop';
import LoginMobile from './LoginMobile';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function LoadLogin() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return React.createElement(
    isMobile ? LoginMobile : LoginDesktop,
    null
  );
}