import { pool } from "../../db/index.js";
import { type Issue } from "./issue.repository.js";

export const getAllIssuesFromDB = async () => {
  const dbResponse = await pool.query<Issue>(`
      SELECT * FROM issues;
      `);

  // dbResponse.rows.map((issue) => {
  //   const reporter = pool.query(``)
  //   issue.reporter_id
  // });
  return dbResponse.rows as Issue[];
};

export const getIssueByIdFromDB = async (id: string) => {};

export const createIssueIntoDB = async (data: Partial<Issue>) => {};

export const updateIssueIntoDB = async (id: string, data: Partial<Issue>) => {};

export const deleteIssueFromDB = async (id: string) => {};

export const issueService = {
  getAllIssuesFromDB,
  getIssueByIdFromDB,
  createIssueIntoDB,
  updateIssueIntoDB,
  deleteIssueFromDB,
};
