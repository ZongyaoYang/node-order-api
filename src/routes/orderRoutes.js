/**
 * POST /api/orders
 *
 * Creates a new card order.
 *
 * Request body:
 * {
 *   memberId: string,
 *   cardType: "new" | "replacement" | "renewal",
 *   shippingMethod: "standard" | "expedited"
 * }
 *
 * Success:
 *   201 Created
 *
 * Validation failure:
 *   400 Bad Request
 *
 * Authentication failure:
 *   401 Unauthorized
 *
 * Authorization failure:
 *   403 Forbidden
 *
 * Unexpected failure:
 *   500 Internal Server Error
 */