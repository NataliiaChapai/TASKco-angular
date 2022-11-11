export interface Board {
    _id: string;
    name: string;
    description?: string;
    createdAt: string;
    userId?: string;
    taskCount: {
        todo: string,
        inprogress: string,
        done: string,
        archive: string
    }
}