import React from 'react'
import CredentialsForm from '../Components/CredentialsForm'
import CustomBackground from '../Components/CustomBackground'
import Navbar from '../Components/Navbar'


function Login() {
    return (
        <div>
            <CustomBackground />
            <Navbar lastChildAction={"Sign Up"} lastChildPath={'/signup'}/>
            <CredentialsForm formTitle={"LOGIN"}/>
        </div>
    )
}

export default Login
