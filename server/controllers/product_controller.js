const productsService = require('../services/product_service');

// Function to retrieve all products with search and pagination
exports.getAllProducts = async (req, reply) => {
  try {
    const {  searchTerm ,page = 1, pageSize = 10 } = req.query; // Extract query parameters
    const products = await productsService.getAllProducts(searchTerm, page, pageSize);
    reply.code(200).send(products);
  } catch (err) {
    console.error(err);
    reply.code(500).send({ message: 'Internal Server Error' });
  }
};

// Function to retrieve a product by ID
exports.getProductById = async (req, reply) => {
  try {
    const { id } = req.params; // Extract path parameter

    const product = await productsService.getProductById(id);
    if (!product) {
      reply.code(404).send({ message: 'Product not found' });
    } else {
      reply.code(200).send(product);
    }
  } catch (err) {
    console.error(err);
    reply.code(500).send({ message: 'Internal Server Error' });
  }
};

// Function to create a new product
exports.createProduct = async (req, reply) => {
  try {
    const newProduct = req.body; // Access product data from request body
    const createdProduct = await productsService.createProduct(newProduct);
    reply.code(201).send(createdProduct); // 201 Created status code
  } catch (err) {
    console.error(err);
    reply.code(400).send({ message: 'Bad Request' }); // 400 for potential validation errors
  }
};

// Function to update a product by ID
exports.updateProduct = async (req, reply) => {
  try {
    const { id } = req.params; // Extract path parameter
    const productUpdates = req.body; // Access product update data from request body

    const updatedProduct = await productsService.updateProduct(id, productUpdates);
    if (!updatedProduct) {
      reply.code(404).send({ message: 'Product not found' });
    } else {
      reply.code(200).send(updatedProduct);
    }
  } catch (err) {
    console.error(err);
    reply.code(400).send({ message: 'Bad Request' }); // 400 for potential validation errors
  }
};

// Function to delete a product by ID
exports.deleteProduct = async (req, reply) => {
  try {
    const { id } = req.params; // Extract path parameter

    await productsService.deleteProduct(id);
    reply.code(204).send(); // 204 No Content for successful deletion
  } catch (err) {
    console.error(err);
    reply.code(500).send({ message: 'Internal Server Error' });
  }
};