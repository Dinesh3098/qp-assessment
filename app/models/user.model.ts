export interface User {
  id: number;
  username: string;
  password: string | undefined;
  role: "admin" | "user";
}
