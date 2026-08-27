const orders = [];

function save(order) {
    orders.push(order);
    return order;
}

export const orderRepository = {
    save,
}