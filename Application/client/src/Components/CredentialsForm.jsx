import React, {useEffect, useReducer, useRef} from 'react'
import { Link } from 'react-router-dom'
import InputField from './InputField'
import CustomButton from './CustomButton'


// Reducer function to perform state update actions for the useReducerHook variables
const reducer = (state, action) => {

    switch(action.type) {
        case 'UPDATE_FIELD':
            return state = {...state, [action.inputField]: action.value}
        case 'RESET':
            return state = {username: '', password: ''} 
        default:
            return state
    }
}


const sendFormData = async(formData) => {
    
    try {
        console.log('Works')
        console.log(formData)

        const serverResponse = await fetch(`${import.meta.env.VITE_SERVER_API_ADDRESS}/debug`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })

        const jsonData = await serverResponse.json()
        console.log(jsonData)

    } catch (error) {
        console.log(error.message)
    }
}


function CredentialsForm({formTitle}) {

    // Initialize hooks
    const focusInput = useRef(null) // For focusing on DOM
    const [formData, dispatch] = useReducer(reducer, {username: '', password: ''}) // For keeping track of state

    useEffect(() => {
        
        // Focuses the currently referenced InputField
        focusInput.current.focus()

    }, [])


    // ------------------- EVENT FUNCTIONS --------------------------

    // Event function that executes once the user clicks the submit button
    const formSubmitHandler = (event) => {
        event.preventDefault()
        sendFormData(formData)
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

            <InputField inputType={'text'} inputName={'username'} labelText={'Username'} onChangeFunction={updateInputField} ref={focusInput}/>
            <InputField inputType={'password'} inputName={'password'} labelText={'Password'} onChangeFunction={updateInputField}/>

            <CustomButton Identifier={'formSubmission'} ButtonType={'submit'} DisplayText={'CONTINUE'}/>

            <Link className='formSkip' to='/builder'>Continue without an account</Link>
        </form>
    )
}

export default CredentialsForm
