import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    (req as any).user = decoded; 
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};