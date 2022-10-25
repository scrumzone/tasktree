export default interface Task {
    name: string,
    description?: string,
    progress: number,
    weight: number,
    completedAt: Date,
    Children: Task[];
}
