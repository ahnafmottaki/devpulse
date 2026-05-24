import type { User } from "../modules/auth/auth.repository.ts";

type UserPayload = Pick<User, "id" | "name" | "email" | "role">;
declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}
