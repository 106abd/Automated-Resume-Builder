import React from 'react'
import CustomBackground from '../Components/CustomBackground'
import CredentialsForm from '../Components/CredentialsForm'
import Navbar from '../Components/Navbar'

function SignUp({authToken, setAuthToken}) {
    return (
        <div>
            <CustomBackground />
            <Navbar lastChildAction={"Login"} lastChildPath={'/'}/>
            <CredentialsForm formTitle={"SIGN UP"} />
        </div>
    )
}

export default SignUp
