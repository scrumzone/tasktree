import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Project, { BlankProject } from '../../types/Project';
import Typography from '@mui/material/Typography';

interface ProjectDialogProps {
  open: boolean;
  onClose: () => void;
  project: Project;
  //onSubmit: (taskData: Task) => void;
}

export default function ProjectDescPopUp(props: ProjectDialogProps) {
  //const [formData, setFormData] = React.useState<Task>({
  //  name: '',
  //  description: '',
  //  weight: 1
  //} as Task);

  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    //setFormData((formData) => ({ ...formData, [target.name]: target.value }));
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Project Description</DialogTitle>
      <DialogContent>
        <Typography>
            {props.project.description}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.onClose();
          }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}