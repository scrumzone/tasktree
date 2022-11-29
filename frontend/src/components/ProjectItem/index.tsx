import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import MessageIcon from '@mui/icons-material/Message';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Project from '../../types/Project';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import {
  Alert,
  Box,
  Button,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Snackbar
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';
import EditProjectDialog from '../EditProjectDialog';
import ProjectDescPopUp from '../ProjectDescPopUp';
import { showSnackbar } from '../../store/snackbar';

interface GetProjectFormProps {
  project: Project;
  onEditSubmit: (formData: Project) => void;
  onDelete: () => void;
}

interface ProgressBarProps {
  project: Project;
}

function LinearProgressWithLabel(props: ProgressBarProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          variant="determinate"
          color={props.project.progress === 100 ? 'success' : 'primary'}
          value={props.project.progress}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.project.progress
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function ProjectListItem(props: GetProjectFormProps) {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDesc, setOpenDesc] = React.useState(false);
  const [showIcons, setShowIcons] = React.useState(false);

  return (
    <>
      <ListItem
        disablePadding
        onMouseEnter={() => setShowIcons(true)}
        onMouseLeave={() => setShowIcons(false)}>
        <ListItemButton component={Link} to={`/projects/${props.project.id}`}>
          <ListItemText disableTypography>
            <Grid container spacing={2} alignItems="center" justifyContent="space-between">
              <Grid xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  sx={{
                    textDecoration: props.project.progress === 100 ? 'line-through' : '',
                    color: props.project.progress === 100 ? 'gray' : '',
                    py: 1
                  }}
                  variant="h6">
                  {props.project.name}
                </Typography>
              </Grid>
              <Grid xs={8}>
                <LinearProgressWithLabel project={props.project} />
              </Grid>
              <Grid xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {showIcons && (
                  <>
                    {!!props.project.description && (
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setOpenDesc(true);
                        }}>
                        <MessageIcon />
                      </IconButton>
                    )}
                    {props.project.progress === 100 && <IconButton />}
                    {props.project.progress !== 100 && (
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setOpenEdit(true);
                        }}>
                        <EditIcon />
                      </IconButton>
                    )}

                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (
                          confirm(
                            `Are you sure you want to delete project "${props.project.name}"?`
                          )
                        ) {
                          props.onDelete();
                        }
                      }}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </Grid>
            </Grid>
          </ListItemText>
        </ListItemButton>
      </ListItem>
      {/* Edit project popup */}
      <EditProjectDialog
        open={openEdit}
        project={props.project}
        onClose={() => setOpenEdit(false)}
        onSubmit={(formData) => {
          props.onEditSubmit(formData);
          if (formData.name == "") {
            return;
          }
          setOpenEdit(false);
        }}
      />
      {/* Edit project popup */}
      <ProjectDescPopUp
        open={openDesc}
        project={props.project}
        onClose={() => setOpenDesc(false)}
      />
    </>
  );
}
