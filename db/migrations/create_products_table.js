exports.up = async (knex) => {
    await knex.schema.createTable('products', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('category');
      table.float('price').notNullable();
      table.jsonb('images').defaultTo('[]'); // Store images as JSON array
    });
  };
  
  exports.down = async (knex) => {
    await knex.schema.dropTable('products');
  };