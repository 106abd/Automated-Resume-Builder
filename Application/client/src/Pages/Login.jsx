import React, {useEffect} from 'react'
import CredentialsForm from '../Components/CredentialsForm'
import CustomBackground from '../Components/CustomBackground'
import Navbar from '../Components/Navbar'


const serverConnectionDebug = async() => {
    try {
        const serverResponse = await fetch(`${import.meta.env.VITE_SERVER_API_ADDRESS}/debug`,{
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


function Login() {

    useEffect(() => {
        serverConnectionDebug()
    }, [])

    return (
        <div>
            <CustomBackground />
            <Navbar lastChildAction={"Sign Up"} lastChildPath={'/signup'}/>
            <CredentialsForm formTitle={"LOGIN"}/>
        </div>
    )
}

export default Login
