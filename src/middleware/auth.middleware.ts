import type { NextFunction, Request, Response } from "express";
import type { User } from "../modules/auth/auth.repository.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import type { PayloadProps } from "../utils/getJwtToken.js";

export const authMiddleware = (...role: User["role"][]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            if (!token) throw new Error("Token not found");
            const decoded = jwt.verify(token, config.jwtSecret);
            req.user = decoded as PayloadProps;
            if (!role.includes(req.user.role)) {
                throw new Error("Unauthorized");
            }
            next();
        } catch (err) {
            next(err);
        }
    };
};
