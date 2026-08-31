import { randomUUID } from "node:crypto";
import { orderRepository } from "../repositories/orderRepository.js";
import { AppError } from "../errors/AppError.js";
import { OrderNotFoundError } from "../errors/OrderNotFoundError.js";

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

export const orderService = {
  createOrder,
  getOrderById,
  listOrders,
};
