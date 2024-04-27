const Fastify = require('fastify');
const productsController = require('../controllers/product_controller'); // Assuming a products controller

module.exports = async function (fastify, options) {
  // Base path for product routes (optional)
  const basePath = '/api/v1/products'; // Example with version prefix

  // define default route
  fastify.get('/', async (request, reply) => {
    return { start: "to start '/api/v1/products' " };
  });

  // Define product routes
  fastify.get(`${basePath}`, productsController.getAllProducts); // Get all products

  // More specific routes for product ID
  fastify.get(`${basePath}/:id`, productsController.getProductById); // Get product by ID
  fastify.put(`${basePath}/:id`, productsController.updateProduct); // Update product
  fastify.delete(`${basePath}/:id`, productsController.deleteProduct); // Delete product

  // Route for creating a new product
  fastify.post(`${basePath}`, productsController.createProduct);
};