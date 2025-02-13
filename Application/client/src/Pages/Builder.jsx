import React from 'react'
import CustomBackground from '../Components/CustomBackground'
import Navbar from '../Components/Navbar'
import Chatbox from '../Components/Chatbox'

function Builder() {
    return (
        <div>
            <CustomBackground />
            <Navbar lastChildAction={"Logout"}/>
            <Chatbox />
        </div>
    )
}

export default Builder
