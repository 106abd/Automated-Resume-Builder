// Module Imports
const cors = require('cors') // Cross-Origin Resource Sharing module
const express = require('express') //Express.JS module

// Create Express app
const app = express()


// Run express app on Node.JS' built-in HTTP Module server
const serverPort = 5000
app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`)
})
