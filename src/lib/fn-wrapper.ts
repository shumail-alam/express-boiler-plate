import { Request, Response, NextFunction, RequestHandler } from "express";

export const asyncWrapper = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

//   app.get("/route", async (req, res, next) => {
//     try {
//        something that might throw error here
//     } catch (err) {
//       next(err); err is catched
//     }
//   });

// this can be simplified using an high order function.
