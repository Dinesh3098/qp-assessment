export const add_new_grocery = `
INSERT INTO groceries (name, price, inventory)
VALUES ($1, $2, $3)
RETURNING *;`;

export const get_groceries = `SELECT * FROM groceries LIMIT $2 OFFSET $1;`

export const update_grocery = `
  UPDATE groceries
  SET name = $1, price = $2, inventory = $3
  WHERE id = $4
  RETURNING *;
`;

export const delete_grocery = `
DELETE FROM groceries 
WHERE id = $1 
RETURNING *;`;