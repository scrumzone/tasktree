import * as React from 'react';
import Typography from '@mui/material/Typography';
import Project, { BlankProject } from '../../types/Project';
import { Skeleton } from '@mui/material';

interface GetProjectFormProps {
  project: Project;
}

export default function ProjectHeader(props: GetProjectFormProps) {
  return (
    <div>
      <Typography
        component="h3"
        variant="h3"
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'row',
          width: '100%'
        }}>
        <Typography
          align="left"
          component="h3"
          variant="h3"
          sx={{
            justifySelf: 'left',
            marginRight: 'auto',
            marginLeft: '30px'
          }}>
          {props.project !== BlankProject ? (
            props.project.name
          ) : (
            <Skeleton variant="rounded" sx={{ width: 300, height: 56 }} />
          )}
        </Typography>

        <Typography
          align="center"
          component="h3"
          variant="h3"
          sx={{
            justifySelf: 'center',

            marginRight: 'auto'
          }}>
          {props.project !== BlankProject ? (
            `${Math.round(props.project.progress)}% completed`
          ) : (
            <Skeleton variant="rounded" sx={{ width: 300, height: 56 }} />
          )}
        </Typography>
      </Typography>
      <Typography 
        align = "left"  
        variant="h6"
        sx={{
          marginBottom: 2,
          justifySelf: 'left',
          marginRight: 'auto',
          marginLeft: '30px'
        }}>
        {props.project.description}
      </Typography>
    </div>
  );
}
