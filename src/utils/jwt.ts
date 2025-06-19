import jwt, { SignOptions, Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const accessTokenSecret: Secret = process.env.ACCESS_TOKEN_SECRET!;
const refreshTokenSecret: Secret = process.env.REFRESH_TOKEN_SECRET!;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRES_IN || "15m";
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRES_IN || "7d";

export const generateAccessToken = (payload: object): string => {
  const options: SignOptions = { expiresIn: accessTokenExpiry as any }; 
  return jwt.sign(payload, accessTokenSecret, options);
};

export const generateRefreshToken = (payload: object): string => {
  const options: SignOptions = { expiresIn: refreshTokenExpiry as any }; 
  return jwt.sign(payload, refreshTokenSecret, options);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, accessTokenSecret);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshTokenSecret);
};