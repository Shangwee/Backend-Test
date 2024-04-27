exports.seed = async (knex) => {
  // Sample product data with valid JSON for images
  const products = [
    { name: 'Headphones', category: 'Electronics', price: 49.99,images: '["https://cdn.dummyjson.com/product-images/1/1.jpg", "https://cdn.dummyjson.com/product-images/1/1.jpg","https://cdn.dummyjson.com/product-images/1/1.jpg"]'},
    { name: 'T-Shirt', category: 'Clothing', price: 19.95,images: '["https://cdn.dummyjson.com/product-images/1/1.jpg", "https://cdn.dummyjson.com/product-images/1/1.jpg","https://cdn.dummyjson.com/product-images/1/1.jpg"]'},
    { name: 'Laptop', category: 'Electronics', price: 799.99, images: '["https://cdn.dummyjson.com/product-images/1/1.jpg", "https://cdn.dummyjson.com/product-images/1/1.jpg","https://cdn.dummyjson.com/product-images/1/1.jpg"]' }, 
    { name: 'Running Shoes', category: 'Sports', price: 89.99, images: '["https://cdn.dummyjson.com/product-images/1/1.jpg", "https://cdn.dummyjson.com/product-images/1/1.jpg","https://cdn.dummyjson.com/product-images/1/1.jpg"]'},
    { name: 'Coffee Mug', category: 'Kitchen', price: 9.99, images: '["https://cdn.dummyjson.com/product-images/1/1.jpg", "https://cdn.dummyjson.com/product-images/1/1.jpg","https://cdn.dummyjson.com/product-images/1/1.jpg"]'},
  ];

  // Insert sample products into the database
  await knex('products').insert(products);
};