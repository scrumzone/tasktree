import React from 'react';
import { NavigateFunction } from 'react-router-dom';

export interface Props {
  navItems: {
    name: string;
    path?: string;
    action?: (
      e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement, MouseEvent>,
      navigate: NavigateFunction
    ) => void;
  }[];
}
