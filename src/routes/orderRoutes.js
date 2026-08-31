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

import express from "express";
import { orderController } from "../controllers/orderController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  createOrderSchema,
  listOrdersQuerySchema,
  orderIdParamsSchema,
  updateOrderStatusSchema,
} from "../schemas/orderSchemas.js";
import { validateQuery } from "../middleware/validateQuery.js";
import { validateParams } from "../middleware/validateParams.js";

// The route connects an HTTP method and URL to a controller
const router = express.Router();

router.get(
  "/",
  validateQuery(listOrdersQuerySchema),
  orderController.listOrders,
);

/**
 * POST /api/orders
 *
 * Creates a new card order.
 */
router.post(
  "/",
  validateRequest(createOrderSchema),
  orderController.createOrder,
);

router.get(
  "/:orderId",
  validateParams(orderIdParamsSchema),
  orderController.getOrderById,
);

router.patch(
  "/:orderId/status",
  validateParams(orderIdParamsSchema),
  validateRequest(updateOrderStatusSchema),
  orderController.updateOrderStatus,
);

export default router;
