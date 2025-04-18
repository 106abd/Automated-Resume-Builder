// Module Imports
import bcrypt from 'bcrypt'
import express from 'express' //Express.JS module
import authorizeUser from '../Middleware/Auth/jwtAuthorization.js'
import generateJWT from '../Middleware/Utility/jwtGenerator.js'
import pool from '../dbPool.js' // Access the PostgreSQL 'Pool' object from dbPool.js
import validifyData from '../Middleware/Utility/validifyData.js'


// Create a router object instead of app
const router = express.Router()


// ROUTES
router.post('/', async(request, response) => {

    try {
        console.log(request.body)
        response.json({message: '/Users Debug'})
        console.log('----------------------------')
        console.log('----------------------------')
    } catch (error) {
        console.log(error.message)
        response.status(500).json({message: 'Server error.'})
    }

})


router.get('/authorize', authorizeUser, async(request, response) => {
    try {
        response.status(200).json(true)
    } catch (error) {
        console.log(error.message)
        response.status(500).json({message: 'Server error.'})
    }
})


router.post('/login', validifyData, async(request, response) => {
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
                const userID = userData.rows[0].user_id
                const authToken = generateJWT(userID)
                
                // Store authToken in HttpOnlyCookie (so client cannot access it with JavaScript)
                response.cookie('authToken', authToken, {
                    httpOnly: true,  // Prevents client-side JavaScript access
                    secure: true,  // Ensures it’s only sent over HTTPS
                    sameSite: 'Strict',  // Prevents CSRF attacks
                    maxAge: 60 * 60 * 1000  // 1 Day Expiry
                })

                response.status(200).json({message: 'Login Successful.'})

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
        console.log(error.message)
        response.status(500).json({message: 'Server error.'})
    }
})


router.post('/logout', async(request, response) => {
    try {

        // Clear the authToken cookie (cookie details listed because it requires an exact settings match to delete)
        response.clearCookie('authToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        })

        response.status(200).json({message: 'Logout Successful.'})

    } catch (error) {
        console.log(error.message)
        response.status(500).json({message: 'Server error.'})
    }
})


router.post('/signup', validifyData, async(request, response) => {

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


export default router // Exported so other files can use/reference the router instance
