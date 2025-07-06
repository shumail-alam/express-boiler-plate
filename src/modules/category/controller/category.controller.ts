import { Request, Response, NextFunction } from "express";
import pool from "@/adapters/postgres/postgres.adapter";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name } = req.body;
  const client = await pool.connect();

  try {
  
    const checkResult = await client.query(
      "SELECT * FROM category WHERE LOWER(name) = LOWER($1)",
      [name]
    );

    if (checkResult.rows.length > 0) {
      res.status(409).json({
        message: "Category already exists",
      });
      return;
    }

    const result = await client.query(
      "INSERT INTO category (name) VALUES ($1) RETURNING *",
      [name]
    );

    res.status(201).json({
      message: "Category created successfully",
      category: result.rows[0],
    });
  } catch (error) {
    next(error);
  } finally {
    client.release();
  }
};

export const getAllCategories = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const client = await pool.connect();

  try {
    const result = await client.query("SELECT * FROM category ORDER BY id DESC");

    res.status(200).json({
      categories: result.rows,
    });
  } catch (error) {
    next(error);
  } finally {
    client.release();
  }
};
