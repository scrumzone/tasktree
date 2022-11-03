export default interface Task {
  ProjectID?: null;
  name: string,
  description?: string,
  progress?: number,
  weight?: number,
  completedAt?: Date,
  Children?: Task[];
}

export const BlankTask: Task = {
  ProjectID: null,
  name: 'Testing project',
  description: '',
  progress: 0,
  weight: 0,
};