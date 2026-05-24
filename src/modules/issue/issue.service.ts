import { pool } from "../../db/index.js";
import { type CreateIssueProp, type Issue } from "./issue.repository.js";

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
