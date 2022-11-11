export interface Task {
    _id: string;
    name: string;
    status: string;
    boardId: string;
    createdAt: string;
    comments: [
        {
            comment?: string,
            time?: string;
            _id: string;
        } 
    ];
    canEdit?: boolean;
    canComment?: boolean;
  }