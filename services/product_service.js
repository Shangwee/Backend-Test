const db = require('../db/database');

// Get all products with optional search and pagination

exports.getAllProducts = async (searchTerm, page, pageSize) => {
  let query = 'SELECT * FROM products';
  const queryParams = [];

  if (searchTerm) {
    query += ' WHERE name LIKE $1';
    searchTerm = `%${searchTerm}%`;
    queryParams.push(searchTerm);
    query += ' LIMIT $2 OFFSET $3';
    queryParams.push(pageSize);
    let offset = (page - 1) * pageSize;
    queryParams.push(offset);
  } else {
    query += ' LIMIT $1 OFFSET $2';
    queryParams.push(pageSize);
    let offset = (page - 1) * pageSize;
    queryParams.push(offset);
  }

  try {
    const products = await db.any(query, queryParams);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to retrieve products'); // Re-throw a generic error for the controller
  }
};

// Get a product by ID
exports.getProductById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = $id';
  const product = await db.oneOrNone(query, { id });
  return product;
};

// Create a new product
exports.createProduct = async (newProduct) => {
  // Build the query dynamically based on product properties
  const fields = Object.keys(newProduct).join(', ');
  const placeholders = fields.replace(/,/g, '$, ');
  const query = `INSERT INTO products (${fields}) VALUES (${placeholders}) RETURNING *`;

  const createdProduct = await db.one(query, newProduct);
  return createdProduct;
};

// Update a product by ID
exports.updateProduct = async (id, productUpdates) => {
  const updateSet = Object.entries(productUpdates)
    .map(([key, value]) => `${key} = $${key}`)
    .join(', ');
  const query = `UPDATE products SET ${updateSet} WHERE id = $id RETURNING *`;

  const params = { ...productUpdates, id };
  const updatedProduct = await db.oneOrNone(query, params);
  return updatedProduct;
};

// Delete a product by ID
exports.deleteProduct = async (id) => {
  const query = 'DELETE FROM products WHERE id = $id';
  await db.none(query, { id });
};