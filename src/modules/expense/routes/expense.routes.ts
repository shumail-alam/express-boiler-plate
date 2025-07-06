import { Router } from "express";
import asyncHandler from "express-async-handler";
import { createExpense } from "../controller/expense.controller";
import { protect } from "../../../middleware/auth.middleware";

const expenseRouter = Router();

expenseRouter.post("/", protect, asyncHandler(createExpense));


export default expenseRouter;
