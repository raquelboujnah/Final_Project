// const dotenv = require("dotenv");
// const knex = require('knex');

// dotenv.config();
// const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT} = process.env;

// const db = knex({
//     client: 'pg',
//     connection: {
//         host: PGHOST,
//         port: PGPORT,
//         user: PGUSER,
//         database: PGDATABASE,
//         password: PGPASSWORD
//     }
// });

// // connecting to data base
// async function getVersion(){
//     try{
//         const result = await db.raw("select version()");
//         console.log(result);
//     }catch(err){
//         console.log(err);
//     }
// }
// //good connection

// module.exports = db



const knex = require('knex');
require('dotenv').config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = knex({
    client: 'pg',
    connection: {
      host: PGHOST,
      database: PGDATABASE,
      user: PGUSER,
      password: PGPASSWORD,
      port: 5432,
      ssl: { rejectUnauthorized: false }, // Ensure SSL is properly configured
    },
  });

  async function getPgVersion() {
    try {
      const result = await sql.raw('select version()');
      console.log(result); // Print the entire result object
    } catch (error) {
      console.error('Error executing query:', error);
    }
  }
  

module.exports = sql
