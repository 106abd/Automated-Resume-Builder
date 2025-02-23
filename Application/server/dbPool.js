const Pool = require('pg').Pool // Manages a pool of database connections, allowing efficient handling of multiple concurrent requests

// Creating the new pool instance
const pool = new Pool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: DB_PORT,
    database: 'automated_resume_builder_database'
})

module.exports = pool; // Exported so other files can use/reference the pool instance
