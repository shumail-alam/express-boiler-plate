import { Router } from "express";
import { getMyExpenses } from "../../users/controller/user.controller";
import { protect } from "../../../middleware/auth.middleware";

const router = Router();


router.get("/", protect, getMyExpenses);

export default router;