import TTNavBarDesktop from './TTNavBarDesktop';
import TTNavBarMobile from './TTNavBarMobile';
import { Props } from './TTNavBarBase';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

export default function TTNavBar(props: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return React.createElement(isMobile ? TTNavBarMobile : TTNavBarDesktop, props, null);
}
