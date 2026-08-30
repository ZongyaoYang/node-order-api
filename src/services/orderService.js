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

function getOrderById(orderId) {
  const order = orderRepository.findById(orderId);

  if (!order) {
    throw new OrderNotFoundError(orderId);
  }

  return order;
}

export const orderService = {
  createOrder,
  getOrderById,
};
