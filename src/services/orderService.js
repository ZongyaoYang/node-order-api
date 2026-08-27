import { randomUUID } from "node:crypto";
import { orderRepository } from "../repositories/orderRepository.js";
import { AppError } from "../errors/AppError.js";

function createOrder(orderInput) {
  const order = {
    orderId: randomUUID(),
    memberId: orderInput.memberId,
    cardType: orderInput.cardType,
    shippingMethod: orderInput.shippingMethod,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  return orderRepository.save(order);
}

function getOrderById(orderId) {
  const order = orderRepository.findById(orderId);

  if (!order) {
    throw new AppError(404, "ORDER_NOT_FOUNT", "Order was not found.");
  }

  return order
}

export const orderService = {
  createOrder,
  getOrderById,
};
