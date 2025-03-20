import React from 'react'
import { useNavigate } from 'react-router-dom'
import CustomBackground from '../Components/CustomBackground'
import Navbar from '../Components/Navbar'
import Chatbox from '../Components/Chatbox'
import Viewport from '../Components/Viewport'
import BuilderTools from '../Components/BuilderTools'


const logoutHandler = async(setAuthStatus, pageRedirect) => {

    try {

        const serverResponse = await fetch(`${import.meta.env.VITE_SERVER_API_ADDRESS}/users/logout`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
        
        const jsonData = await serverResponse.json()
        console.log(jsonData)

        if (serverResponse.ok) {
            setAuthStatus(false)
            console.log(jsonData)
            pageRedirect('/')

        } else {
            console.error(`Server Error Logged Status Code: ${serverResponse.status}`)
        }

    } catch (error) {
        console.log(error.message)
    }
}


function Builder({setAuthStatus}) {

    const pageRedirect = useNavigate()

    return (
        <div>
            <CustomBackground />
            <Navbar lastChild={'Logout'} lastChildAction={logoutHandler} lastChildActionArgs = {[setAuthStatus, pageRedirect]}/>
            <Chatbox />
            <Viewport />
            <BuilderTools />
        </div>
    )
}

export default Builder
