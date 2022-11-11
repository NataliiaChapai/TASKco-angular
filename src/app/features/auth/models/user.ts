export interface User {
  email: string;
  password?: string;
  avatarURL?: string | null;
  token?: string
}