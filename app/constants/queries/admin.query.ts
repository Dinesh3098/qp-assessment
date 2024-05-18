export const add_new_grocery = `
INSERT INTO groceries (name, price, inventory)
VALUES ($1, $2, $3)
RETURNING *;`;

export const get_groceries = `'SELECT * FROM groceries OFFSET $1 LIMIT $2';`