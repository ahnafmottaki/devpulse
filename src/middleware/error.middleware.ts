import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse.js";

const errorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    sendResponse({
        res,
        statusCode,
        success: false,
        message,
        err: err,
    });
};

export default errorMiddleware;
