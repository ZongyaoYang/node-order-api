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

async function findMany({ status, memberId, limit, offset }) {
  const conditions = [];
  const filterValues = [];

  if (status) {
    filterValues.push(status);
    conditions.push(`status = $${filterValues.length}`);
  }

  if (memberId) {
    filterValues.push(memberId);
    conditions.push(`member_id = $${filterValues.length}`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const limitParameter = filterValues.length + 1;
  const offsetParameter = filterValues.length + 2;

  const dataQuery = `
    SELECT
        order_id AS "orderId",
        member_id AS "memberId,
        card_type AS "cardType",
        shipping_method AS "shippingMethod",
        status,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
    FROM orders
    ${whereClause}
    ORDER BY created_at DESC, order_id DESC
    LIMIT $${limitParameter}
    OFFSET $${offsetParameter};
  `;

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM orders
    ${whereClause};
  `;

  const dataValues = [...filterValues, limit, offset];

  const [dataResult, countResult] = await Promise.all([
    pool.query(dataQuery, dataValues),
    pool.query(countQuery, filterValues),
  ]);
}

export const orderRepository = {
  save,
  findById,
  findMany,
};
