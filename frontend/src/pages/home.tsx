import React from 'react';
import { List, Typography } from '@mui/material';
import { BlankUser } from '../types/User';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function HomePage() {
  const [user, setUser] = React.useState(BlankUser);
  const dispatch = useAppDispatch();

  const current = useAppSelector((state) => state.user.current);

  React.useEffect(() => {
    const fetchUser = async () => {
      setUser(current || BlankUser);
    };
    fetchUser();
  }, []);

  return (
    <div>
      <Typography variant="h1">HOME PAGE</Typography>
      <Typography variant="h4">Hello, {user.username}!</Typography>
    </div>
  );
}
