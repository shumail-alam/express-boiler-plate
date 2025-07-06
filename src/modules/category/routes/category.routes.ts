import { Router } from "express";
import asyncHandler from "express-async-handler";
import { createCategory, getAllCategories } from "../controller/category.controller";
import { protect } from "@/middleware/auth.middleware";

const router = Router();

router.post("/create", protect, asyncHandler(createCategory));
router.get("/", protect, asyncHandler(getAllCategories));

export default router;
