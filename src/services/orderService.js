import { randomUUID } from "node:crypto";
import { orderRepository } from "../repositories/orderRepository.js";

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
  return orderRepository.findById(orderId);
}

export const orderService = {
  createOrder,
  getOrderById,
};
