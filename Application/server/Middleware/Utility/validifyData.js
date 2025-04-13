// Function that ensures that the user's login/signup inputs are in a valid format
function validifyData(request, response, next) {
    
    const {username, password} = request.body

    // If username is empty
    if (!username) {
        response.status(400).json({message: 'Missing username.'})
    
    // If password is empty    
    } else if (!password){
        response.status(400).json({message: 'Missing password.'})
    
    // Proceed to next middleware if form data is in a valid format
    } else {
        next()
    }

}

export default validifyData
