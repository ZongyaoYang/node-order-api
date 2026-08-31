import { OrderNotFoundError } from "../errors/OrderNotFoundError.js";
import { AppError } from "../errors/AppError.js";

export function errorHandler(error, req, res, next) {
  if (error instanceof OrderNotFoundError) {
    return res.status(404).json({
      error: {
        code: error.code,
        message: "Order was not found.",
      },
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: { code: error.code, message: error.message },
    });
  }

  console.error("Unexpected request error:", error);

  return res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred.",
    },
  });
}
