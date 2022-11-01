import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';


export default function TaskListItem() {
  return (
    <Stack direction="row" spacing={5}>
      <Button variant="outlined" startIcon={<CheckCircleOutlineIcon />}>
        Task Name
        <IconButton>
            <AddIcon />
        </IconButton>
        <IconButton>
            <EditIcon />
        </IconButton>
        <IconButton>
            <DeleteIcon />
        </IconButton>

      </Button>
    </Stack>
  );
}