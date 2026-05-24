import { Router } from "express";
import { issueController } from "./issue.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", issueController.getAllIssues);

router.get("/:id", issueController.getIssueById);

router.post(
    "/",
    authMiddleware("contributor", "maintainer"),
    issueController.createIssue,
);

router.patch(
    "/:id",
    authMiddleware("maintainer", "contributor"),
    issueController.updateIssue,
);

router.delete(
    "/:id",
    authMiddleware("maintainer"),
    issueController.deleteIssue,
);

export default router;
