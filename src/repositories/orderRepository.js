const orders = [];

function save(order) {
  orders.push(order);
  return order;
}

function findById(orderId) {
  return orders.find((order) => order.orderId == orderId);
}

export const orderRepository = {
  save,
};
