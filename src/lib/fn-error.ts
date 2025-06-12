export class HttpError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;
  public errors?: Record<string, string[] | undefined>;

  constructor(
    message: string,
    statusCode: number,
    validationErrors?: Record<string, string[] | undefined>
  ) {
    super(message);

    if (validationErrors) {
      this.errors = validationErrors;
    }

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
