import type { Response } from "express";
interface SendResponseProps {
    res: Response;
    success: boolean;
    statusCode: number;
    message: string;
    err?: any;
    data?: Record<any, any>;
}
const sendResponse = ({
    res,
    statusCode,
    success,
    message,
    data,
    err,
}: SendResponseProps) => {
    res.status(statusCode).json({
        success,
        message,
        ...(err ? { errors: err } : {}),
        ...(data ? { data } : {}),
    });
};

export default sendResponse;
