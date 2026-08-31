import { AppError } from "./AppError.js";

export class InvalidOrderStatusTransitionError extends AppError {
  constructor(currentStatus, requestedStatus) {
    super(
      409,
      "INVALID_ORDER_STATUS_TRANSITION",
      `Order status cannot change from ${currentStatus} to ${requestedStatus}`,
    );
    this.currentStatus = currentStatus;
    this.requestedStatus = requestedStatus;
  }
}
