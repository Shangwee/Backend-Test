const productsController = require('../controllers/product_controller'); 

module.exports = async function (fastify, options) {
  // Base path for product routes
  const basePath = '/api/v1/products';

  // define default route
  fastify.get('/', async (request, reply) => {
    return { start: "to start '/api/v1/products' " };
  });

  fastify.get(`${basePath}`, productsController.getAllProducts); // Get all products
  fastify.get(`${basePath}/:id`, productsController.getProductById); // Get product by ID
  fastify.put(`${basePath}/:id`, productsController.updateProduct); // Update product
  fastify.delete(`${basePath}/:id`, productsController.deleteProduct); // Delete product
  fastify.post(`${basePath}`, productsController.createProduct);   // Route for creating a new product
};