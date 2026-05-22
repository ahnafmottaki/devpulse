import { type Request, type Response } from "express";
import { issueService } from "./issue.service.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/sendResponse.js";

export const getAllIssues = async (req: Request, res: Response) => {
  try {
    const issues = await issueService.getAllIssuesFromDB();
    sendResponse({
      res,
      statusCode: StatusCodes.OK,
      success: true,
      message: "All issues retrieved successfully",
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

export const createIssue = async (req: Request, res: Response) => {};

export const updateIssue = async (req: Request, res: Response) => {};

export const deleteIssue = async (req: Request, res: Response) => {};

export const issueController = {
  getAllIssues,
  getIssueById,
  createIssue,
  updateIssue,
  deleteIssue,
};
