import React from 'react';
import { Button, List, Typography } from '@mui/material';
import UserService from '../services/UserService';
import User, { BlankUser } from '../types/User';
import AuthService from '../services/AuthService';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearCurrentUser } from '../store/user';
import CreateTaskDialog from '../components/CreateTaskDialog';
import ProjectService from '../services/ProjectService';
import { BlankProject } from '../types/Project';
import Task from '../types/Task';
import EditTaskDialog from '../components/EditTaskDialog';
import ExpandableTaskList from '../components/ExpandableTaskList';

function logout(setUser: React.Dispatch<React.SetStateAction<User>>, clearCurrentUser: () => void) {
  AuthService.signOut();
  setUser(BlankUser);
  clearCurrentUser();
}

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
  const [dOpen, setDOpen] = React.useState(false);
  const [dEOpen, setDEOpen] = React.useState(false);
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
      <Button variant="outlined" onClick={() => setDOpen(true)}>
        Open CreateTaskDialog
      </Button>
      <CreateTaskDialog
        open={dOpen}
        onClose={() => setDOpen(false)}
        onSubmit={(formData) => {
          console.log(formData);
        }}
      />
      <Button variant="outlined" onClick={() => setDEOpen(true)}>
        Open EditTaskDialog
      </Button>
      <EditTaskDialog
        open={dEOpen}
        task={task}
        onClose={() => setDEOpen(false)}
        onSubmit={(formData) => {
          console.log(formData);
        }}
      />
      <List>
        <ExpandableTaskList task={task} />
      </List>
    </div>
  );
}
