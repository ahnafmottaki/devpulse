import { type Request, type Response } from "express";
import { issueService } from "./issue.service.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/sendResponse.js";
import type { CreateIssueProp } from "./issue.repository.js";

export const getAllIssues = async (req: Request, res: Response) => {
    try {
        const issues = await issueService.getAllIssuesFromDB();
        sendResponse({
            res,
            statusCode: StatusCodes.OK,
            success: true,
            message: "Issue retrived successfully",
            data: issues,
        });
    } catch (err) {
        sendResponse({
            res,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            success: false,
            message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        });
    }
};

export const getIssueById = async (req: Request, res: Response) => {};

export const createIssue = async (req: Request, res: Response) => {
    try {
        const issueBody: CreateIssueProp = req.body;
        const user = req.user;
        if (!user) throw new Error("User not found");
        const reporter_id = user.id;
        const createdIssue = await issueService.createIssueIntoDB(
            issueBody,
            reporter_id,
        );
        sendResponse({
            res,
            success: true,
            statusCode: StatusCodes.CREATED,
            message: "Issue Created successfully",
            data: createdIssue,
        });
    } catch (err) {
        sendResponse({
            res,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            success: false,
            message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        });
    }
};

export const updateIssue = async (req: Request, res: Response) => {};

export const deleteIssue = async (req: Request, res: Response) => {};

export const issueController = {
    getAllIssues,
    getIssueById,
    createIssue,
    updateIssue,
    deleteIssue,
};
