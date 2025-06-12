import { Router } from "express";
import { RegisterController } from "../controllers/register.controller";

const authRouter = Router();

authRouter.route("/signup").post(RegisterController.signup);

export { authRouter };
