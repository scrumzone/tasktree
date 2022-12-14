import Task, { BlankTask } from './Task';

export default interface Project {
  id?: number;
  name: string;
  description?: string;
  root?: Task;
  progress: number;
  updatedAt?: Date;
}

export const BlankProject: Project = {
  id: 0,
  name: '',
  description: '',
  progress: 0,
  root: BlankTask
};
