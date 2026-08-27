import { orderService } from "../services/orderService.js";

function createOrder(req, res) {
  const createdOrder = orderService.createOrder(req.body);

  res.status(201).location(`/api/orders/${createdOrder.orderId}`)
  .json({
    data: createdOrder,
  });
}

export const orderController = {
    createOrder,
}