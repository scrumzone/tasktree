import React from 'react';
import ProjectHeader from '../components/ProjectHeader';
import Project, { BlankProject } from '../types/Project';
import ExpandableTaskList from '../components/ExpandableTaskList';
import { useParams } from 'react-router-dom';
import ProjectService from '../services/ProjectService';
import TaskListItem from '../components/TaskItem';
import Confetti from 'react-confetti';
import { useWindowSize } from '../App';
import { Grid, Skeleton } from '@mui/material';

export default function ProjectPage() {
  const windowSize = useWindowSize();
  const params = useParams();
  const [project, setProject] = React.useState<Project>(BlankProject);
  const [displayConfetti, setDisplayConfetti] = React.useState(false);
  const [initComplete, setInitComplete] = React.useState(true);

  const loadProject = (initRender: boolean) => {
    ProjectService.getProject(parseInt(params.projectId!)).then((project) => {
      setProject(project);
      if (project.progress === 100 && initComplete === false && !initRender) {
        setDisplayConfetti(true);
        setTimeout(() => setDisplayConfetti(false), 15000); // larger than it needs to be to overcome differences in machines
      }
    });
  };

  React.useEffect(() => {
    loadProject(true);
    setInitComplete(project.progress === 100);
  }, []);

  const TaskListTag =
    project.root!.children && project.root!.children.length ? ExpandableTaskList : TaskListItem;

  return (
    <>
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        run={displayConfetti}
        numberOfPieces={1500}
        recycle={false}
      />
      <ProjectHeader project={project} />
      {project != BlankProject ? (
        <TaskListTag task={project.root!} reloadProject={() => loadProject(false)} />
      ) : (
        <Skeleton
          variant="rounded"
          height={56}
          width={'95%'}
          sx={{ margin: 'auto', marginTop: '10px' }}
        />
      )}
    </>
  );
}
