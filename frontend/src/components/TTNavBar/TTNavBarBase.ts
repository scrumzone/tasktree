import React from 'react';

export interface Props {
  navItems: {
    name: string;
    path?: string;
    action?: (
      e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement, MouseEvent>
    ) => void;
  }[];
}
