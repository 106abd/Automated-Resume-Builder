const Pool = require('pg').Pool // Manages a pool of database connections, allowing efficient handling of multiple concurrent requests

// Creating the new pool instance
console.log(process.env.DB_USERNAME, process.env.DB_PASSWORD, )
const pool = new Pool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})

module.exports = pool; // Exported so other files can use/reference the pool instance
