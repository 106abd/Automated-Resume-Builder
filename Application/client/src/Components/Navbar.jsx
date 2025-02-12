import React from 'react'

function Navbar({lastChildAction}) {
    return (
        <nav className='navbar'>
            <ul>
                <li id='navbarTitle'><a>RESUME BUILDER</a></li>
                <li><a>{lastChildAction}</a></li>
            </ul>
        </nav>
    )
}

export default Navbar
