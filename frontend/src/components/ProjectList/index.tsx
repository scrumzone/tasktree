import { Snackbar, Alert, ListItem } from '@mui/material';
import * as React from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import projects from '../../pages/projects';
import ProjectService from '../../services/ProjectService';
import Project from '../../types/Project';
import ProjectListItem from '../ProjectItem';

export interface ProjectListProps {
  projects: Project[];
  setProjects: (e: Project[]) => void;
}

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  function onEditSubmit(formData: Project) {
    data.projects[index].name = formData.name;
    data.projects[index].description = formData.description;
    ProjectService.updateProject(data.projects[index], data.projects[index].id!);
  }

  function onDelete() {
    ProjectService.deleteProject(data.projects[index].id!);
    data.setProjects(data.projects.filter((project: Project) => project != data.projects[index]));
  }

  return (
    <ProjectListItem
      onEditSubmit={onEditSubmit}
      onDelete={onDelete}
      project={data.projects[index]}
    />
  );
}

export default function ProjectList(props: ProjectListProps) {
  return (
    <FixedSizeList
      height={800}
      width={'100%'}
      itemSize={46}
      itemCount={props.projects.length}
      overscanCount={5}
      itemData={{ projects: props.projects, setProjects: props.setProjects }}>
      {renderRow}
    </FixedSizeList>
  );
}
