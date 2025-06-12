import express from "express";
import { authRouter } from "./modules/auth/routes/auth.routes";
import { globalErrorHandler } from "./utils/error-middleware";

const app = express();
// middleware chain here
app.use(express.json());
app.use("/api/v1/auth", authRouter);

// global error handler must be at the bottom of the midldeware chain
app.use(globalErrorHandler);

app.listen(4000, () => {
  console.log("✅ Server running at port: ", 4000);
});
