import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./modules/auth/routes/auth.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRouter);

export default app;
