export default interface Task {
  id?: number;
  name: string;
  description?: string;
  progress: number;
  weight: number;
  completedAt: Date | null;
  children: Task[] | null;
}
