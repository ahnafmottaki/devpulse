import { type Request, type Response } from "express";
import type { LoginBody, RegisterBody } from "./auth.repository.js";
import { authService } from "./auth.service.js";
import sendResponse from "../../utils/sendResponse.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const login = async (req: Request, res: Response) => {
    const loginCredentials: LoginBody = req.body;
    try {
        const data = await authService.loginUser(loginCredentials);
        sendResponse({
            res,
            success: true,
            message: "Login successful",
            statusCode: StatusCodes.OK,
            data,
        });
    } catch (err) {
        sendResponse({
            res,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            success: false,
            message:
                err instanceof Error
                    ? err.message
                    : ReasonPhrases.INTERNAL_SERVER_ERROR,
        });
    }
};

export const register = async (req: Request, res: Response) => {
    const userDetails: RegisterBody = req.body;
    try {
        const createdUser = await authService.registerUser(userDetails);
        sendResponse({
            res,
            success: true,
            message: "User registered successfully",
            statusCode: StatusCodes.OK,
            data: createdUser,
        });
    } catch (err) {
        sendResponse({
            res,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            success: false,
            message:
                err instanceof Error
                    ? err.message
                    : ReasonPhrases.INTERNAL_SERVER_ERROR,
        });
    }
};

export const authController = {
    login,
    register,
};
