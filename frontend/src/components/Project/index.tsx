import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ProjectHeader from '../ProjectHeader';
import Project, { BlankProject } from '../../types/Project';
import ExpandableTaskList from '../ExpandableTaskList';
import { useParams } from 'react-router-dom';
import Task, { BlankTask } from '../../types/Task';
import ProjectService from '../../services/ProjectService';
import TaskService from '../../services/TaskService';
import TaskListItem from '../TaskItem';

export default function ProjectComponent() {
  const params = useParams();
  const [open, setOpen] = React.useState(false);
  const [project, setProject] = React.useState<Project>(BlankProject);

  React.useEffect(() => {
    const fetchProject = async () => {
      setProject(await ProjectService.getProject(parseInt(params.projectId!)));
    };
    fetchProject();
  }, []);

  console.log(project.root);
  const handleClick = () => {
    setOpen(!open);
  };

  const TaskListTag =
    project.root!.children && project.root!.children.length ? ExpandableTaskList : TaskListItem;

  return (
    <div>
      <ProjectHeader project={project} />
      <TaskListTag task={project.root!} />
    </div>
  );
}
