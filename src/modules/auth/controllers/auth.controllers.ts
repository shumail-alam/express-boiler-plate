import { Request, Response, NextFunction } from "express";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../../utils/jwt";

export const refresh = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.refreshToken;

  if (!token) {
    res.status(401).json({ message: "No refresh token provided" });
    return;
  }

  try {
    const decoded = verifyRefreshToken(token) as { id: number; email: string };

    if (!decoded?.email || !decoded?.id) {
      throw new Error("Invalid token payload");
    }

    const accessToken = generateAccessToken({ id: decoded.id, email: decoded.email });
    const refreshToken = generateRefreshToken({ id: decoded.id, email: decoded.email });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

export const protectedRoute = (_req: Request, res: Response): void => {
  res.status(200).json({ message: "Access granted to protected route" });
};  