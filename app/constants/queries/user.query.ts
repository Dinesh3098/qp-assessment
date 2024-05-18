export const get_groceries = `
    SELECT * FROM groceries
    WHERE name ILIKE $1
    OFFSET $2
    LIMIT $3;`;

export const count_groceries_item = `
    SELECT COUNT(*) FROM groceries
    WHERE name ILIKE $1;`;