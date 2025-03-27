// Module Imports
const express = require('express') //Express.JS module

// Create a router object instead of app
const router = express.Router()

// ROUTES
router.post('/', async(request, response) => {

    try {
        console.log(request.body)
        response.json({message: '/chat Debug'})
        console.log('----------------------------')
        console.log('----------------------------')
    } catch (error) {
        console.log(error.message)
        response.status(500).json({message: 'Server error.'})
    }

})

module.exports = router // Exported so other files can use/reference the router instance
