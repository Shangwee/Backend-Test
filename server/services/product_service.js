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
  id = parseInt(id);
  const query = 'SELECT * FROM products WHERE id = $1';
  try {
    const product = await db.oneOrNone(query, [id]);
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Failed to retrieve product'); // Re-throw a generic error for the controller
  }
};

// Create a new product
exports.createProduct = async (newProduct) => {
  let query = "insert into products (name, category, price, images) values ($1, $2, $3, $4) returning *";
  const { name, category, price, images } = newProduct;
  // Convert images to JSON string
  const imagesString = JSON.stringify(images);
  try {
    const createdProduct = await db.one(query, [name, category, price, imagesString]);
    return createdProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product'); // Re-throw a generic error for the controller
  }
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