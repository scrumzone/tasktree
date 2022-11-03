export default interface Task {

  id?: number;
  name: string;
  description?: string;
  progress: number;
  weight: number;
  completedAt?: Date | null;
  children?: Task[] | null;
  ProjectId?: number;
}

export const BlankTask: Task = {
  ProjectId: null,
  name: 'Testing project',
  description: '',
  progress: 0,
  weight: 0,
};
