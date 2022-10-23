export interface Task {
    _id: string;
    name: string;
    status: string;
    boardId: string;
    createdAt: string;
    comments: [
        message?: string,
        time?: string 
    ];
    canEdit?: boolean;
    canComment?: boolean;
  }