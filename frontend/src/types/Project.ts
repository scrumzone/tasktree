import Task from './Task';

export default interface Project {
  id?: number;
  name: string;
  description?: string;
  root?: Task;
  progress: number;
}

export const BlankProject: Project = {
  id: 0,
  name: 'blank',
  description: 'blank',
  progress: 0
};
