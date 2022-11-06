import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import Project from '../../types/Project';
import ProjectForm from '../ProjectForm';

interface CreateProjectFormProps {
  project: Project;
  open: boolean;
  onClose: () => void;
  onSubmit: (project: Project) => void;
}

export default function EditProjectDialog(props: CreateProjectFormProps) {
  const [formData, setFormData] = React.useState<Project>(props.project);

  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setFormData((formData) => ({ ...formData, [target.name]: target.value }));
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Edit Project</DialogTitle>
      <DialogContent>
        <ProjectForm project={formData} onChange={onChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={() => props.onSubmit(formData)}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}
