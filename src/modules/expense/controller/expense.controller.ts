import { Request, Response } from "express";
import pool from "@/adapters/postgres/postgres.adapter";


export const createExpense = async (req: Request, res: Response): Promise<void> => {
  const { amount, category_id } = req.body;
  const user = (req as any).user;

  if (!amount || !category_id) {
    res.status(400).json({ message: "Amount and category_id are required" });
    return;
  }

  try {
    const result = await pool.query(
      "INSERT INTO expenses (user_id, amount, category_id) VALUES ($1, $2, $3) RETURNING *",
      [user.id, amount, category_id]
    );

    res.status(201).json({ expense: result.rows[0] });
  } catch (error) {
    console.error("Create Expense Error:", error);
    res.status(500).json({ message: "Something went wrong while creating expense" });
  }
};


