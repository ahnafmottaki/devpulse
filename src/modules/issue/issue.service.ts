import { pool } from "../../db/index.js";
import type { User } from "../auth/auth.repository.js";
import { type CreateIssueProp, type Issue } from "./issue.repository.js";

const addReporterDetailsToIssue = async (issue: Issue) => {
  const reporter = await pool.query<User>(
    `SELECT id, name, role FROM users WHERE id = $1`,
    [issue.reporter_id],
  );
  if (!reporter.rows[0]) return null;
  const { reporter_id: _, ...rest } = issue;
  return { ...rest, reporter: reporter.rows[0] };
};

export const getAllIssuesFromDB = async () => {
  const dbResponse = await pool.query<Issue>(`
      SELECT * FROM issues;
      `);

  const issuePromises = dbResponse.rows.map(addReporterDetailsToIssue);
  return Promise.all(issuePromises);
};

export const getIssueByIdFromDB = async (id: number) => {
  const dbResponse = await pool.query<Issue>(
    `SELECT * FROM issues WHERE id = $1`,
    [id],
  );
  if (!dbResponse.rows[0]) return null;
  return addReporterDetailsToIssue(dbResponse.rows[0]);
};

export const createIssueIntoDB = async (
  data: CreateIssueProp,
  reported_id: number,
) => {
  const dbResponse = await pool.query<Issue>(
    `
        INSERT INTO issues (title, description, type, status, reporter_id)
        VALUES ($1, $2, $3, 'open', $4)
        RETURNING *;
    `,
    [data.title, data.description, data.type, reported_id],
  );
  return dbResponse.rows[0]!;
};

export const updateIssueIntoDB = async (id: string, data: Partial<Issue>) => {};

export const deleteIssueFromDB = async (id: string) => {};

export const issueService = {
  getAllIssuesFromDB,
  getIssueByIdFromDB,
  createIssueIntoDB,
  updateIssueIntoDB,
  deleteIssueFromDB,
};
