// Module Imports
const bcrypt = require('bcrypt')
const express = require('express') //Express.JS module
const generateJWT = require('../jwtGenerator')
const pool = require('../dbPool') // Access the PostgreSQL 'Pool' object from dbPool.js

// Create a router object instead of app
const router = express.Router()


// ROUTES
router.post('/', async(request, response) => {

    try {
        console.log(request.body)
        response.json('Users Debug')
        console.log('----------------------------')
        console.log('----------------------------')
    } catch (error) {
        console.log(error.message)
        response.status(500).json({message: 'Server error.'})
    }

})


router.post('/login', async(request, response) => {
    try {
        const {username, password} = request.body // Retrieve username and password from request body
        const userData = await pool.query('SELECT * FROM users where user_name = $1', [username]) // Query to check if the user exists or not

        // If rows were returned from the query (i.e. at least one user with that username) then proceed, else return error
        if (userData.rowCount > 0) {

            const storedUserPassword = userData.rows[0].user_password // Access the password in the database
            const validPassword = await bcrypt.compare(password, storedUserPassword) // Compare the client inputted password with the stored password

            // If the client inputted password is valid (i.e. the bcrypt comparison is True) then proceed, else return error 
            if (validPassword) {
                
                // Obtaining the user's ID and generating a JWT auth token with it 
                const userID = userData.rows.user_id
                const authToken = generateJWT(userID)

                response.status(200).json({message: 'Login Successful.', token: authToken})

            } else {
                response.status(401).json({message: 'Invalid password. Please try again.'})
            }


        } else {
            response.status(401).json({message: 'Invalid username. Please try again.'})
        }

        console.log('Login transaction success.')
        console.log('--------------------------')
        console.log('--------------------------')

    } catch (error) {
        console.log(error)
        response.status(500).json({message: 'Server error.'})
    }
})


router.post('/signup', async(request, response) => {

    try {
        
        const {username, password} = request.body // Retrieve username and password from request body
        const userData = await pool.query('SELECT * FROM users where user_name = $1', [username]) // Query to check if the user alredy exists or not 
        
        // If no rows were returned from the query (i.e. no user with that username) then proceed, else return error
        if (userData.rowCount === 0) {
            
            // Slow Hashing (salting + hashing) the password
            const saltRound = 15
            const salt = await bcrypt.genSalt(saltRound)
            const bcryptedPassword = await bcrypt.hash(password, salt)
            
            // Inserting the new user into the database with the slow hashed password
            const newUser = await pool.query('INSERT INTO users (user_name, user_password) VALUES ($1, $2) RETURNING *;', [username, bcryptedPassword])
            response.status(201).json({message: 'User successfully registered!'}) // Sending client a "CREATED" status code (201) as the response.
        } else {
            response.status(401).json({message: 'Username already taken. Please try a different username.'})
        }
        
        console.log('Sign up transaction success.')
        console.log('--------------------------')
        console.log('--------------------------')

    } catch (error) {
        console.log(error.message)
        response.status(500).json({message: 'Server error.'})
    }

})


module.exports = router; // Exported so other files can use/reference the router instance
