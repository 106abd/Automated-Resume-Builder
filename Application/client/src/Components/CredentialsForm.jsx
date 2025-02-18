import React, {useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import InputField from './InputField'
import CustomButton from './CustomButton'



function CredentialsForm({formTitle}) {

    const focusInput = useRef(null)

    useEffect(() => {
        
        // Focuses the currently referenced InputField
        focusInput.current.focus()

    }, [])

    return (
        <form className='credForm'>
            
            <header>
                <h1 className='formTitle'>{formTitle}</h1>
            </header>

            <InputField inputType={'text'} labelText={'Username'} ref={focusInput}/>
            <InputField inputType={'password'} labelText={'Password'}/>

            <CustomButton Identifier={'formSubmission'} ButtonType={'submit'} DisplayText={'CONTINUE'}/>

            <Link className='formSkip' to='/builder'>Continue without an account</Link>
        </form>
    )
}

export default CredentialsForm
