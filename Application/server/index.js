// Module Imports
const cors = require('cors') // Cross-Origin Resource Sharing module
const dotenv = require('dotenv') // Dotenv (.env) processing module
const express = require('express') //Express.JS module
const {pool} = require('./dbPool') // Access the PostgreSQL 'Pool' object from dbPool.js

// Initialization methods
const app = express() // Create Express app
dotenv.config() // Automate dotenv configurations processing

// Middleware (run/use the following code everytime before a request/response process occurs)
app.use(cors()) // Use cors to provide permissions to request origin addresses and permissible HTTP commands
app.use(express.json()) // Automate request body data stream chunk collection and parsing to JSON notation


// Run express app on Node.JS' built-in HTTP Module server
const serverPort = process.env.SERVER_PORT
app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`)
})
