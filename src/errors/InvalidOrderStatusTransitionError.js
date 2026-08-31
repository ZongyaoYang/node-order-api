import { AppError } from "./AppError.js";

export class InvalidOrderStatusTransitionError extends AppError {
  constructor(currentStatus, requestedStatus) {
    super(
      "INVALID_ORDER_STATUS_TRANSITION",
      409,
      `Order status cannot change from ${currentStatus} to ${requestedStatus}`,
      {
        currentStatus,
        requestedStatus,
      },
    );
  }
}
