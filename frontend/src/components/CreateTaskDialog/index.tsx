import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React from 'react';
import Task from '../../types/Task';
import TaskForm from '../TaskForm';

interface CreateTaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (taskData: Task) => void;
}

export default function CreateTaskDialog(props: CreateTaskFormProps) {
  const [formData, setFormData] = React.useState<Task>({
    name: '',
    description: '',
    weight: 1
  } as Task);

  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setFormData((formData) => ({ ...formData, [target.name]: target.value }));
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
        <TaskForm task={formData} onChange={onChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={() => props.onSubmit(formData)}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
