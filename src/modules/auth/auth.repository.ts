type Role = "contributor" | "maintainer";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
    created_at: Date;
    updated_at: Date;
}

export type RegisterBody = Pick<User, "name" | "email" | "password" | "role">;

export type LoginBody = Pick<User, "email" | "password">;
