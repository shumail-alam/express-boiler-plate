import { Request, Response } from "express";
import pool from "@/adapters/postgres/postgres.adapter";


export const createExpense = async (req: Request, res: Response): Promise<void> => {
  const { amount, category } = req.body;
  const user = (req as any).user;
  console.log("Request Body:", req.body); 

  if (!amount || !category) {
    res.status(400).json({ message: "Amount and category are required" });
    return;
  }
  try {
    const result = await pool.query(
      "INSERT INTO expenses (user_id, amount, category) VALUES ($1, $2, $3) RETURNING *",
      [user.id, amount, category]
    );
    res.status(201).json({ expense: result.rows[0] });
  } catch (error) {
    console.error("Create Expense Error:", error);
    res.status(500).json({ message: "Something went wrong while creating expense" });
  }
};

export const getUserExpenses = async (req: Request, res: Response) => {
  const user = (req as any).user;

  try {
    const result = await pool.query(
      `SELECT * FROM expenses WHERE user_id = $1 ORDER BY created_at DESC`,
      [user.id]
    );

    res.status(200).json({ expenses: result.rows });
  } catch (error) {
    console.error("Get Expenses Error:", error);
    res.status(500).json({ message: "Something went wrong while fetching expenses" });
  }
};
