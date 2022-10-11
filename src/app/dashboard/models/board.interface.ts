export interface Board {
    _id: string;
    name: string;
    description?: string;
    createdAt: string;
    taskCount: {
        todo: string,
        inprogress: string,
        done: string
    }
}