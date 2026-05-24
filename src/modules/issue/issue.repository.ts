type Status = "open" | "in_progress" | "resolved";
type IssueType = "bug" | "feature_request";

export interface Issue {
    id: number;
    title: string;
    description: string;
    type: IssueType;
    status: Status;
    reporter_id: number;
    created_at: Date;
    updated_at: Date;
}

export type CreateIssueProp = Pick<Issue, "title" | "description" | "type">;
