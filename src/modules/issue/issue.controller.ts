import { type Request, type Response } from "express";
import { issueService } from "./issue.service.js";

export const getAllIssues = async (req: Request, res: Response) => {
  const issues = await issueService.getAllIssuesFromDB();
  res.status(200).json({
    success: true,
    message: "All issues retrieved successfully",
    data: issues,
  });
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
