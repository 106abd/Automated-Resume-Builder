import React, {} from 'react'
import InputField from './InputField'
import CustomButton from './CustomButton'



function CredentialsForm({formTitle}) {

    return (
        <form className='credForm'>
            
            <header>
                <h1 className='formTitle'>{formTitle}</h1>
            </header>

            <InputField inputType={'text'} labelText={'Username'}/>
            <InputField inputType={'password'} labelText={'Password'}/>

            <CustomButton Identifier={'formSubmission'} ButtonType={'submit'} DisplayText={'CONTINUE'}/>

            <a className='formSkip'>Continue without an account</a>
        </form>
    )
}

export default CredentialsForm
