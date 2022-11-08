import React from 'react';
import { List, Typography } from '@mui/material';
import { BlankUser } from '../types/User';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Task, { BlankTask } from '../types/Task';
import ExpandableTaskList from '../components/ExpandableTaskList';

const task: Task = {
  name: 'Task1',
  description: 'Task description',
  weight: 100,
  progress: 1,
  children: [
    {
      name: 'Task2',
      description: 'Task description',
      weight: 1,
      progress: 50,
      children: [
        {
          name: 'Task3',
          description: 'Task description',
          weight: 1,
          progress: 0,
          children: [
            {
              name: 'Task4',
              description: 'Task description',
              weight: 1,
              progress: 0,
              children: null
            }
          ]
        }
      ],
      completedAt: null
    }
  ],
  completedAt: null
};

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
      <ExpandableTaskList task={task} />
    </div>
  );
}
