import React from 'react';
import HomeDesktop from './HomeDesktop';
import HomeMobile from './HomeMobile';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function HomeComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return React.createElement(isMobile ? HomeMobile : HomeDesktop, null);
}
