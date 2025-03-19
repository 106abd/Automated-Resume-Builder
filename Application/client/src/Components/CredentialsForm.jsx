import React, {useEffect, useReducer, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputField from './InputField'
import CustomButton from './CustomButton'


// Reducer function to perform state update actions for the useReducerHook variables
const reducer = (state, action) => {

    switch(action.type) {
        case 'UPDATE_FIELD':
            return {...state, [action.inputField]: action.value}
        case 'RESET':
            return {username: '', password: ''} 
        default:
            return state
    }
}


function CredentialsForm({formTitle, authToken, setAuthToken}) {

    // Initialize hooks
    const focusInput = useRef(null) // For focusing on DOM
    const [formData, dispatch] = useReducer(reducer, {username: '', password: ''}) // For keeping track of state
    const pageRedirect = useNavigate()

    useEffect(() => {
        
        // Focuses the currently referenced InputField
        if (focusInput.current) {
            focusInput.current.focus()
        }

    }, [])


    //  ------------------------ FUNCTIONS --------------------------
    const sendFormData = async() => {
    
        const formTitleData = {
            'LOGIN': {route: '/users/login', action: pageRedirect, args: ['/builder']},
            'SIGN UP': {route: '/users/signup', action: pageRedirect, args: ['/']}
        } 
        
        const requestRoute = formTitleData[formTitle].route
    
        if (requestRoute) {
        
            try {
                console.log('Works')
                console.log(formData)
        
                const serverResponse = await fetch(`${import.meta.env.VITE_SERVER_API_ADDRESS}${requestRoute}`,{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(formData)
                })
                
                const jsonData = await serverResponse.json()
                console.log(jsonData)
    
                if (serverResponse.ok) {

                    if (jsonData.token) {
                        setAuthToken(jsonData.token)
                    }

                    const {action, args} = formTitleData[formTitle]
                    action(...args)

                } else {
                    console.error(`Server Error Logged Status Code: ${serverResponse.status}`)
                }
        
            } catch (error) {
                console.log(error.message)
            }
    
        } else {
            console.error('The CredentialsForm component must have prop "formTitle" equal to "LOGIN" or "SIGN UP". Edit "sendFormData" function for extra form titles.')
        }
    }


    // ------------------- EVENT FUNCTIONS --------------------------

    // Event function that executes once the user clicks the submit button
    const formSubmitHandler = (event) => {
        event.preventDefault()
        sendFormData(formData, formTitle, pageRedirect)
    }


    // Event function that executes everytime the user changes any input fields, and calls to update the corresponding state variable 
    const updateInputField = (event) => {
        dispatch({type: 'UPDATE_FIELD', inputField: event.target.name, value: event.target.value})
    }


    // JSX
    return (
        <form className='credForm' onSubmit={formSubmitHandler}>
            
            <header>
                <h1 className='formTitle'>{formTitle}</h1>
            </header>

            <InputField 
                inputType={'text'} 
                inputName={'username'} 
                labelText={'Username'} 
                onChangeFunction={updateInputField} 
                ref={focusInput}
            />

            <InputField 
                inputType={'password'} 
                inputName={'password'} 
                labelText={'Password'} 
                onChangeFunction={updateInputField}
            />

            <CustomButton 
                Identifier={'formSubmission'} 
                ButtonType={'submit'} 
                DisplayText={'CONTINUE'}
            />

            <Link className='formSkip' to='/builder'>Continue without an account</Link>
        </form>
    )
}

export default CredentialsForm
