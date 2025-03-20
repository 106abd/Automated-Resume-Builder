import React from 'react'
import CustomBackground from '../Components/CustomBackground'
import Navbar from '../Components/Navbar'
import Chatbox from '../Components/Chatbox'
import Viewport from '../Components/Viewport'
import BuilderTools from '../Components/BuilderTools'


function Builder({authStatus, setAuthStatus}) {
    return (
        <div>
            <CustomBackground />
            <Navbar lastChild={'Logout'} lastChildPath={'/'}/>
            <Chatbox />
            <Viewport />
            <BuilderTools />
        </div>
    )
}

export default Builder
