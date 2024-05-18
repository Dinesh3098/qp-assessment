export const get_groceries = `
SELECT * FROM groceries
WHERE name ILIKE $1
OFFSET $2
LIMIT $3;`;

export const count_groceries_item = `
SELECT COUNT(*) FROM groceries
WHERE name ILIKE $1;`;

export const acquire_lock_on_grocery = `
SELECT pg_advisory_xact_lock($1) FROM groceries 
WHERE id = $1;`;

export const check_inventory = `
SELECT inventory FROM groceries 
WHERE id = $1`;

export const reduce_inventory = `
UPDATE groceries 
SET inventory = inventory - $1 
WHERE id = $2`;

export const insert_order = `
INSERT INTO orders (user_id) 
VALUES ($1) 
RETURNING id;`;

export const insert_order_items = `
INSERT INTO order_items (order_id, grocery_id, quantity) 
VALUES ($1, $2, $3);`;
