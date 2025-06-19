import { Router } from "express";
import asyncHandler from "express-async-handler";
import { registerUser } from "../controllers/register.controller";
import { refresh, protectedRoute } from "../controllers/auth.controllers";
import { protect } from "../../../middleware/auth.middleware";

import { createExpense, getUserExpenses } from "../../expense/expense.controller";
const authRouter = Router();

authRouter.post("/register", asyncHandler(registerUser));
authRouter.post("/refresh", asyncHandler(refresh));
authRouter.get("/protected", protect, asyncHandler(protectedRoute));


authRouter.post("/expenses", protect, asyncHandler(createExpense));
authRouter.get("/expenses", protect, asyncHandler(getUserExpenses));

export default authRouter;