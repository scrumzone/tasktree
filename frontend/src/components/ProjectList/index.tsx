import * as React from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import ProjectService from '../../services/ProjectService';
import { useAppDispatch } from '../../store/hooks';
import { showSnackbar } from '../../store/snackbar';
import Project from '../../types/Project';
import shallowEqual from '../../util/object-equality';
import ProjectListItem from '../ProjectItem';

export interface ProjectListProps {
  projects: Project[];
  setProjects: (e: Project[]) => void;
}

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  var preEditProject: Project = JSON.parse(JSON.stringify(data.projects[index]));
  function onEditSubmit(formData: Project) {
    data.projects[index].name = formData.name;
    data.projects[index].description = formData.description;
    ProjectService.updateProject(data.projects[index], data.projects[index].id!);
    console.log(data.projects[index], preEditProject);
    if (!shallowEqual(preEditProject, data.projects[index])) {
      data.dispatch(showSnackbar({ message: 'Project updated successfully', severity: 'success' }));
    }
    preEditProject = JSON.parse(JSON.stringify(data.projects[index]));
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
