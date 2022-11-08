import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import React from 'react';
import Task from '../../types/Task';
import TaskListItem from '../TaskItem';

interface ExpandableTaskListItemProps {
  task: Task;
  reloadProject: () => void;
}

export default function ExpandableTaskList({ task, reloadProject }: ExpandableTaskListItemProps) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <List disablePadding>
      <TaskListItem
        task={task}
        onClick={() => {
          setExpanded(!expanded);
        }}
        reloadProject={reloadProject}>
        {expanded ? <ExpandLess /> : <ExpandMore />}
      </TaskListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ pl: 2 }}>
        {task.children &&
          task.children.map((child) => {
            if (child.children!.length) {
              return (
                <ExpandableTaskList key={child.id} task={child} reloadProject={reloadProject} />
              );
            } else {
              return (
                <TaskListItem
                  key={child.id || child.name}
                  task={child}
                  reloadProject={reloadProject}></TaskListItem>
              );
            }
          })}
      </Collapse>
    </List>
  );
}
