// Module Imports
const jwt = require('jsonwebtoken') //JSON Web Token auth module
const dotenv = require('dotenv') // Dotenv (.env) processing module

// Initialization methods
dotenv.config() // Automate dotenv configurations processing


// Function that generates a JWT token using a given user ID and signs it (i.e. encrypts it) given a private key
function generateJWT(user_id) {

    // Create payload object with desired information on the client
    const payload = {
        user: user_id
    }

    // Hide client information by encrypting it with a private key (signing it)
    jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 60 * 60}) // Measured in seconds thus 60 * 60, can also use "'1hr'"
}


module.exports = generateJWT // Exported so other files can use the generateJWT function
