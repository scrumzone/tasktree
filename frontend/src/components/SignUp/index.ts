import React from 'react';
import SignUpDesktop from './SignUpDesktop';
import SignUpMobile from './SignUpMobile';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function SignUpComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return React.createElement(isMobile ? SignUpMobile : SignUpDesktop, null);
}
