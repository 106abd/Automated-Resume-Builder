// Module Imports
import express from 'express' //Express.JS module

// Create a router object instead of app
const router = express.Router()


router.post('/', async(request, response) => {

    try {
        console.log(request.body)
        response.json({message: 'Successfully connected to server! - Debug'})
        console.log('Successul client connection! - Debug')
        console.log('----------------------------')
        console.log('----------------------------')
    } catch (error) {
        console.log(error.message)
    }

})


export default router // Exported so other files can use/reference the router instance
