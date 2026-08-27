import { orderService } from "../services/orderService.js";

function createOrder(req, res) {
  const createdOrder = orderService.createOrder(req.body);

  res.status(201).location(`/api/orders/${createdOrder.orderId}`).json({
    data: createdOrder,
  });
}

function getOrderById(req, res) {
  const { orderId } = req.params;

  const order = orderService.getOrderById(orderId);

  return res.status(200).json({
    data: order,
  });
}

export const orderController = {
  createOrder,
  getOrderById,
};
