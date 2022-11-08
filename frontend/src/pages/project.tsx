import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { useParams } from 'react-router-dom';
import { render } from '@testing-library/react';
import ProjectComponent from '../components/Project'

class ProjectPage extends React.Component {
  render(){
    return <ProjectComponent />
  }
}

export default ProjectPage
