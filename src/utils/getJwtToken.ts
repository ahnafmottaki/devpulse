import jwt, { type SignOptions } from "jsonwebtoken";
import config from "../config/config.js";
import type { User } from "../modules/auth/auth.repository.js";

export type PayloadProps = Pick<User, "id" | "name" | "email" | "role">;

export const getJwtToken = (payload: PayloadProps) => {
    const expiresIn = config.jwtExpiresIn as Required<SignOptions>["expiresIn"];
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn });
    return token;
};
