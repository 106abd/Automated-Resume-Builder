// Module Imports
import cors from 'cors' // Cross-Origin Resource Sharing module
import dotenv from 'dotenv' // Dotenv (.env) processing module
import express from 'express' //Express.JS module
import chatRoutes from './Routes/ChatRoutes.js'
import debugRoutes from './Routes/DebugRoutes.js'
import usersRoutes from './Routes/UsersRoutes.js'


// Initialization methods
const app = express() // Create Express app
dotenv.config() // Automate dotenv configurations processing


// Middleware (run/use the following code everytime before a request/response process occurs)
app.use(cors()) // Use cors to provide permissions to request origin addresses and permissible HTTP commands
app.use(express.json()) // Automate request body data stream chunk collection and parsing to JSON notation


// Middleware ENDPOINTS
app.use('/chat', chatRoutes)
app.use('/debug', debugRoutes)
app.use('/users', usersRoutes)


// Run express app on Node.JS' built-in HTTP Module server
const serverPort = process.env.SERVER_PORT
app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`)
})

// Dummy log statement
console.log('This is a change in the main branch')
console.log('This is a change in the es6-conversion branch')

