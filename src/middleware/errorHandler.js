import { OrderNotFoundError } from "../errors/OrderNotFoundError.js";

export function errorHandler(error, req, res, next) {
  if (error instanceof OrderNotFoundError) {
    return res.status(404).json({
      error: {
        code: error.code,
        message: "Order was not found.",
      },
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
