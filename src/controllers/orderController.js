import { orderService } from "../services/orderService.js";

function createOrder(req, res) {
  const createOrder = orderService.createOrder(req.body);

  res.status(201).location(`/api/orders/${createOrder.orderId}`)
  .json({
    data: createOrder,
  });
}

export const orderController = {
    createOrder,
}