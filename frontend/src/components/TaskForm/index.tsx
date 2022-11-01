import { TextField } from '@mui/material';
import React from 'react';
import Task from '../../types/Task';

interface TaskFormProps {
  task: Task;
  onChange: (e: React.SyntheticEvent) => void;
}

export default function TaskForm({ task, onChange }: TaskFormProps) {
  return (
    <form>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        name="name"
        label="Task name"
        type="text"
        fullWidth
        variant="standard"
        onChange={onChange}
        value={task.name}
      />
      <TextField
        autoFocus
        margin="dense"
        id="description"
        name="description"
        label="Task description"
        type="text"
        fullWidth
        variant="standard"
        onChange={onChange}
        value={task.description}
      />
      <TextField
        autoFocus
        margin="dense"
        id="weight"
        name="weight"
        label="Task weight"
        type="number"
        fullWidth
        variant="standard"
        onChange={onChange}
        value={task.weight}
      />
    </form>
  );
}
