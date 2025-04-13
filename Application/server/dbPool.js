import postgres from 'pg' // Manages a pool of database connections, allowing efficient handling of multiple concurrent requests
import dotenv from 'dotenv' // Dotenv (.env) processing module


// Initialization methods
dotenv.config() // Automate dotenv configurations processing

const { Pool } = postgres

// Creating the new pool instance
const pool = new Pool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})

export default pool; // Exported so other files can use/reference the pool instance
