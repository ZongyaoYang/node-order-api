export class OrderNotFoundError extends Error {
    constructor(orderId) {
        super(`Order ${orderId} was not found.`);

        this.name = "OrderNotFoundError";
        this.code = "ORDER_NOT_FOUND";
        this.orderId = orderId;
    }
}