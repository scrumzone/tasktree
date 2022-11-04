export default interface Task {

  id?: number;
  name: string;
  description?: string;
  progress: number;
  weight: number;
  completedAt?: Date | null;
  children?: Task[] | null;
  projectId?: number | null;
}

export const BlankTask: Task = {
  projectId: null,
  name: 'Testing project',
  description: '',
  progress: 0,
  weight: 0,
};
