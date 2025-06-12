import { Request, Response, NextFunction } from "express";
import { HttpError } from "@/lib/fn-error";

type jsonResponse = {
  status: string;
  errors?: null | unknown;
  message: string;
};

export const globalErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  const json: jsonResponse = {
    status: err.status,
    message: err.message,
  };

  if (err.errors) {
    json.errors = err.errors;
  }

  res.status(err.statusCode).json(json);
};
