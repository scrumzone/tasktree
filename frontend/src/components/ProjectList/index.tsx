import { Snackbar, Alert, ListItem } from '@mui/material';
import { ThunkDispatch } from '@reduxjs/toolkit';
import * as React from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { AnyAction } from 'redux';
import projects from '../../pages/projects';
import ProjectService from '../../services/ProjectService';
import { useAppDispatch } from '../../store/hooks';
import { showSnackbar } from '../../store/snackbar';
import { SnackbarState, UserState } from '../../store/types';
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
    data.dispatch(showSnackbar({ message: 'Project updated successfully', severity: 'success' }));
  }

  function onDelete() {
    ProjectService.deleteProject(data.projects[index].id!);
    data.setProjects(data.projects.filter((project: Project) => project != data.projects[index]));
    data.dispatch(showSnackbar({ message: 'Project deleted successfully', severity: 'success' }));
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
  const dispatch = useAppDispatch();
  return (
    <FixedSizeList
      height={800}
      width={'100%'}
      itemSize={46}
      itemCount={props.projects.length}
      overscanCount={5}
      itemData={{ projects: props.projects, setProjects: props.setProjects, dispatch }}>
      {renderRow}
    </FixedSizeList>
  );
}
