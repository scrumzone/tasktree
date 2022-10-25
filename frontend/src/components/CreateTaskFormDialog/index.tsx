import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React from 'react';

export interface CreateTaskFormData {
  name: string;
  description: string;
  weight: number;
}

interface CreateTaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (taskData: CreateTaskFormData) => void;
}

export default function CreateTaskFormDialog(props: CreateTaskFormProps) {
  const [formData, setFormData] = React.useState<CreateTaskFormData>({
    name: '',
    description: '',
    weight: 1
  } as CreateTaskFormData);

  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setFormData((formData) => ({ ...formData, [target.name]: target.value }));
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
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
          value={formData.name}
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
          value={formData.description}
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
          value={formData.weight}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={() => props.onSubmit(formData)}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
