export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "contributor" | "maintainer";
  created_at: Date;
  updated_at: Date;
}

export type RegisterBody = Pick<User, "name" | "email" | "password" | "role">;

export type LoginBody = Pick<User, "email" | "password">;
