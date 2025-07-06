import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./modules/auth/routes/auth.routes";
import categoryRoutes from "./modules/category/routes/category.routes";
import expenseRouter from "./modules/expense/routes/expense.routes"; 
import expensidRouter from "./modules/users/routes/user.routes"

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/auth", authRouter);
app.use("/api/expenses", expenseRouter);
app.use("/v1/api/user/expenses", expensidRouter);


export default app;
