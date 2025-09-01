export interface User {
  id: string;
  username: string;
  role: "employee" | "admin";
}

export interface AuthResponse {
  user: User;
  token: string;
}
