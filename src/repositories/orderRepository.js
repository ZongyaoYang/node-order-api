import { pool } from "../database/pool.js";

async function save(order) {
  const query = `
    INSERT INTO orders (
        order_id,
        member_id,
        card_type,
        shipping_method,
        status
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING
        order_id AS "orderId",
        member_id AS "memberId",
        card_type AS "cardType",
        shipping_method AS "shippingMethod",
        status,
        created_at AS "createdAt",
        updated_at AS "updatedAt";
    `;

  const values = [
    order.orderId,
    order.memberId,
    order.cardType,
    order.shippingMethod,
    order.status,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
}

async function findById(orderId) {
  const query = `
    SELECT
        order_id AS "orderId",
        member_id AS "memberId",
        card_type AS "cardType",
        shipping_method AS "shippingMethod",
        status,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
    FROM orders
    WHERE order_id = $1;
  `;

  const result = await pool.query(query, [orderId]);

  return result.rows[0];
}

export const orderRepository = {
  save,
  findById,
};
