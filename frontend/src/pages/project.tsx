import React from 'react';
import ProjectHeader from '../components/ProjectHeader';
import Project, { BlankProject } from '../types/Project';
import ExpandableTaskList from '../components/ExpandableTaskList';
import { useParams } from 'react-router-dom';
import ProjectService from '../services/ProjectService';
import TaskListItem from '../components/TaskItem';

export default function ProjectPage() {
  const params = useParams();
  const [project, setProject] = React.useState<Project>(BlankProject);

  const loadProject = () => {
    ProjectService.getProject(parseInt(params.projectId!)).then((project) => {
      setProject(project);
    });
  };

  React.useEffect(() => {
    loadProject();
  }, []);

  const TaskListTag =
    project.root!.children && project.root!.children.length ? ExpandableTaskList : TaskListItem;

  return (
    <>
      <ProjectHeader project={project} />
      <TaskListTag task={project.root!} reloadProject={loadProject} />
    </>
  );
}
