export interface User {
  email: string;
  password?: string;
  avatarUrl: string | null;
  token?: string
}