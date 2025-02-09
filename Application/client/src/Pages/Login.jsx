import React from 'react'
import CredentialsForm from '../Components/CredentialsForm'
import CustomBackground from '../Components/CustomBackground'


function Login() {
    return (
        <div>
            <CustomBackground />
            <CredentialsForm formTitle={"LOGIN"}/>
        </div>
    )
}

export default Login
