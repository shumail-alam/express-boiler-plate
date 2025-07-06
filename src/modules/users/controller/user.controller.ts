import { Request, Response, NextFunction } from "express";
import pool from "../../../adapters/postgres/postgres.adapter";

export const getMyExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;
  const connection = await pool.connect();

  try {
    const result = await connection.query(
      `
      SELECT 
        e.id AS expense_id,
        e.amount,
        e.created_at,
        (SELECT name FROM categories WHERE id = e.category_id) AS category_name
      FROM expenses e
      WHERE e.user_id = $1
      ORDER BY e.created_at DESC
      `,
      [user.id]
    );

    res.status(200).json({ expenses: result.rows });
  } catch (error) {
    next(error);
  } finally {
    connection.release();
  }
};