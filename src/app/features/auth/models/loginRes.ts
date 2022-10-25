export interface LoginRes {
    token: string;
    user: {
        email: string;
        createdAt: string;
        avatarUrl: string | null;
    }
}

