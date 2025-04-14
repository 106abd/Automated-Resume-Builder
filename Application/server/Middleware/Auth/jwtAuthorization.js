// Module Imports
import jwt from 'jsonwebtoken' //JSON Web Token auth module
import dotenv from 'dotenv' // Dotenv (.env) processing module

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


export default authorizeJWT
