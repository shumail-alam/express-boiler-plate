import { Router } from "express";
import asyncHandler from "express-async-handler";
import { registerUser } from "../../../modules/auth/controllers/auth/register.controller";
import {refresh , protectedRoute } from "../../auth/controllers/auth/auth.controller"
import { protect } from "../../../middleware/auth.middleware";
import { loginUser } from "../../../modules/auth/controllers/auth/login.controller";

const authRouter = Router();  

authRouter.post("/register", asyncHandler(registerUser));
authRouter.post("/refresh", asyncHandler(refresh));
authRouter.get("/protected", protect, asyncHandler(protectedRoute));
authRouter.post("/login", loginUser);





export default authRouter;