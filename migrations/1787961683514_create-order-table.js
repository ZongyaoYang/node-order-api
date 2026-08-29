/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.sql(`
        CREATE TABLE orders (
            order_id UUID PRIMARY KEY,
            member_id VARCHAR(50) NOT NULL,
            card_type VARCHAR(20) NOT NULL,
            shipping_method VARCHAR(20) NOT NULL,
            status VARCHAR(20) NOT NULL DEFAULT 'pending',
            created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        

            CONSTRAINT orders_card_type_check
                CHECK (card_type IN ('new', 'replacement', 'renewal')),

            CONSTRAINT orders_shipping_method_check
                CHECK (shipping_method IN ('standard', 'expedited')),

            CONSTRAINT orders_status_check
                CHECK (
                    status IN (
                        'pending',
                        'processing',
                        'shipped',
                        'delivered',
                        'cancelled'
                    )
                )
        );
        `);

  pgm.sql(`
        CREATE INDEX orders_member_id_index
            ON orders (member_id);
        `);

  pgm.sql(`
        CREATE INDEX orders_status_index
            ON orders (status);
        `);

  pgm.sql(
    `CREATE INDEX orders_created_at_index
            ON orders (created_at DESC);`,
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.sql(`DROP TABLE IF EXISTS orders;`);
};
