import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import Task from '../../types/Task';
import TaskForm from '../TaskForm';

interface CreateTaskFormProps {
  task: Task;
  open: boolean;
  onClose: () => void;
  onSubmit: (taskData: Task) => void;
}

export default function EditTaskDialog(props: CreateTaskFormProps) {
  const [formData, setFormData] = React.useState<Task>(props.task);

  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setFormData((formData) => ({ ...formData, [target.name]: target.value }));
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TaskForm task={formData} onChange={onChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={() => props.onSubmit(formData)}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}
