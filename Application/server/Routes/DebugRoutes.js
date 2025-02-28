// Module Imports
const express = require('express') //Express.JS module

// Create a router object instead of app
const router = express.Router()


router.post('/', async(request, response) => {

    try {
        console.log(request.body)
        response.json('Successfully connected to server.')
        console.log('Successul client connection!')
        console.log('----------------------------')
        console.log('----------------------------')
    } catch (error) {
        console.log(error.message)
    }

})


module.exports = router; // Exported so other files can use/reference the router instance
