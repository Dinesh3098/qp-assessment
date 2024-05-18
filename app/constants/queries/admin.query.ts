export const addNewGrocery = `
INSERT INTO groceries (name, price, inventory)
VALUES ($1, $2, $3)
RETURNING *;`;
