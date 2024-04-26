exports.seed = async (knex) => {
  // Sample product data with valid JSON for images
  const products = [
    { name: 'Headphones', category: 'Electronics', price: 49.99,images: []},
    { name: 'T-Shirt', category: 'Clothing', price: 19.95,images: []},
    { name: 'Laptop', category: 'Electronics', price: 799.99, images: [] }, 
    { name: 'Running Shoes', category: 'Sports', price: 89.99, images: []},
    { name: 'Coffee Mug', category: 'Kitchen', price: 9.99, images: []},
  ];

  // Insert sample products into the database
  await knex('products').insert(products);
};