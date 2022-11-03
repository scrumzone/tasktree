import React from 'react';
import { TextField } from '@mui/material';
import Project from '../../types/Project';

interface ProjectFormProps {
  project: Project;
  onChange: (e: React.SyntheticEvent) => void;
}

export default function ProjectForm({ project, onChange }: ProjectFormProps) {
  return (
    <form>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        name="name"
        label="Project Name"
        type="project"
        fullWidth
        variant="standard"
        onChange={onChange}
        value={project.name}
      />
      <TextField
        autoFocus
        margin="dense"
        id="description"
        name="description"
        label="Project Description"
        type="description"
        fullWidth
        variant="standard"
        onChange={onChange}
        value={project.description}
      />
    </form>
  );
}
