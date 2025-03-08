// Module Imports
const jwt = require('jsonwebtoken') //JSON Web Token auth module
const dotenv = require('dotenv') // Dotenv (.env) processing module

// Initialization methods
dotenv.config() // Automate dotenv configurations processing

const authorizeJWT = async (response, request, next) => {

    try {
        
        const authToken = request.header('token')

        if (!authToken) {
            response.status(403).json({message: 'Not Authorized.'})
        
        } else {
            const payload = jwt.verify(authToken, process.env.JWT_SECRET)
            request.userID = payload.userID
        }

    } catch (error) {
        console.log(error.message)
        response.status(403).json({message: 'Not Authorized.'})
    }

} 


module.exports = authorizeJWT
