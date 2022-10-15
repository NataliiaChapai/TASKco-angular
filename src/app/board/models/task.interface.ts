export interface Task {
    name: string;
    status: string;
    boardId: string;
    createdAt: string;
    comments: [
        message?: string,
        time?: string 
    ];
  }