import { HttpError } from "@/lib/fn-error";
import { asyncWrapper } from "@/lib/fn-wrapper";
import type { Request, Response } from "express";

export const signup = asyncWrapper(async (req, res, next) => {
  try {
    res.status(201).json({
      message: "ok",
    });
  } catch (err: any) {
    return next(new HttpError(err.message, 500));
  }
});
