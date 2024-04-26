const fastify = require('fastify')({logger: true}) 
const route = require('./routes/product_route')
const knex = require('knex');

const config = require('./knexfile.js');
const db = knex(config.development);

fastify.register(route)

async function runMigrationsAndSeeds() {
    try {
      await db.migrate.latest();
      await db.seed.run();
    } catch (err) {
      console.error('Error running migrations or seeds:', err);
    } finally {
      // Close the database connection
      await db.destroy();
    }
  }
  
runMigrationsAndSeeds();


async function start()  { 
    try{ 
        await fastify.listen({ port: 3000 })
    } catch(err) { 
        fastify.log.error(err) 
        process.exit(1) 
    } 
} 

start()