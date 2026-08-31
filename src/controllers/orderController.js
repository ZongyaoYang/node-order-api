import { orderService } from "../services/orderService.js";

async function createOrder(req, res) {
  const createdOrder = await orderService.createOrder(req.body);

  res.status(201).location(`/api/orders/${createdOrder.orderId}`).json({
    data: createdOrder,
  });
}

async function getOrderById(req, res) {
  const { orderId } = res.locals.validatedParams;

  const order = await orderService.getOrderById(orderId);

  return res.status(200).json({
    data: order,
  });
}

async function listOrders(req, res) {
  const result = await orderService.listOrders(res.locals.validatedQuery);

  return res.status(200).json({
    data: result.orders,
    pagination: result.pagination,
  });
}

export const orderController = {
  createOrder,
  getOrderById,
  listOrders,
};
