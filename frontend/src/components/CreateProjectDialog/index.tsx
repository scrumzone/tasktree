import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from '@mui/material';
import React from 'react';
import Project from '../../types/Project';
import ProjectForm from '../ProjectForm';

interface CreateProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (project: Project) => void;
}

export default function CreateProjectDialog({ open, onClose, onSubmit }: CreateProjectDialogProps) {
  const [formData, setFormData] = React.useState<Project>({
    name: '',
    description: ''
  } as Project);

  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setFormData((formData) => ({ ...formData, [target.name]: target.value }));
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Project</DialogTitle>
      <DialogContent>
        <ProjectForm project={formData} onChange={onChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            onSubmit(formData);
          }}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
