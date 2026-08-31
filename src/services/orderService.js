import { randomUUID } from "node:crypto";
import { orderRepository } from "../repositories/orderRepository.js";
import { AppError } from "../errors/AppError.js";
import { OrderNotFoundError } from "../errors/OrderNotFoundError.js";
import { InvalidOrderStatusTransitionError } from "../errors/InvalidOrderStatusTransitionError.js";

const allowedStatusTransitions = {
  pending: ["processing", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};

async function createOrder(orderInput) {
  const order = {
    orderId: randomUUID(),
    memberId: orderInput.memberId,
    cardType: orderInput.cardType,
    shippingMethod: orderInput.shippingMethod,
    status: "pending",
    // PostgreSQL generates timestamps using DEFAULT CURRENT_TIMESTAMP
    // createdAt: new Date().toISOString(),
  };

  return orderRepository.save(order);
}

async function getOrderById(orderId) {
  const order = await orderRepository.findById(orderId);

  if (!order) {
    throw new OrderNotFoundError(orderId);
  }

  return order;
}

async function listOrders({ page, limit, status, memberId }) {
  const offset = (page - 1) * limit;

  const result = await orderRepository.findMany({
    status,
    memberId,
    limit,
    offset,
  });

  return {
    orders: result.orders,
    pagination: {
      page,
      limit,
      totalItems: result.total,
      totalPages: Math.ceil(result.total / limit),
    },
  };
}

async function updateOrderStatus(orderId, requestedStatus) {
  const order = await getOrderById(orderId);

  const allowedStatuses = allowedStatusTransitions[order.status];

  if (!allowedStatuses.includes(requestedStatus)) {
    throw new InvalidOrderStatusTransitionError(order.status, requestedStatus);
  }

  const updatedOrder = await orderRepository.updateStatus(
    orderId,
    requestedStatus,
    order.status,
  );

  if (!updatedOrder) {
    throw new AppError(
      "ORDER_UPDATE_CONFLICT",
      409,
      "Order was modified by another request. Please retry.",
    );
  }

  return updatedOrder;
}

export const orderService = {
  createOrder,
  getOrderById,
  listOrders,
  updateOrderStatus,
};
