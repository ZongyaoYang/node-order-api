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

  if (!order) {
    return res.status(404).json({
      error: {
        code: "ORDER_NOT_FOUND",
        message: "Order was not found.",
      },
    });
  }

  return res.status(200).json({
    data: order,
  });
}

export const orderController = {
  createOrder,
  getOrderById,
};
