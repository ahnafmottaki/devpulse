import type { Response } from "express";
interface SendResponseProps {
  res: Response;
  success: boolean;
  statusCode: number;
  message: string;
  err?: Record<any, any>;
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
    ...(err ? { error: err } : {}),
    ...(data ? { data } : {}),
  });
};

export default sendResponse;
