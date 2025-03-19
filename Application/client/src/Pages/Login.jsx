import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import CredentialsForm from '../Components/CredentialsForm'
import CustomBackground from '../Components/CustomBackground'
import Navbar from '../Components/Navbar'


const checkAuthStatus = (authToken, pageRedirect) => {
    if (authToken !== '') {
        pageRedirect('/builder')
    }
}


const serverConnectionDebug = async() => {
    try {
        const serverResponse = await fetch(`${import.meta.env.VITE_SERVER_API_ADDRESS}/users`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({message: 'Client Request Received!'})
        })

        const jsonData = await serverResponse.json()
        console.log(jsonData)
    } catch (error) {
        console.log(error.message)
    }
}


function Login({authToken, setAuthToken}) {

    const pageRedirect = useNavigate()

    useEffect(() => {
        serverConnectionDebug()
        checkAuthStatus(authToken, pageRedirect)
    }, [])

    return (
        <div>
            <CustomBackground />
            <Navbar lastChildAction={"Sign Up"} lastChildPath={'/signup'}/>
            <CredentialsForm formTitle={"LOGIN"} authToken={authToken} setAuthToken={setAuthToken}/>
        </div>
    )
}

export default Login
