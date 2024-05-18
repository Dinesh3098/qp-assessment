export const add_new_grocery = `
INSERT INTO groceries (name, price, inventory)
VALUES ($1, $2, $3)
RETURNING *;`;

export const get_groceries = `SELECT * FROM groceries LIMIT $2 OFFSET $1;`