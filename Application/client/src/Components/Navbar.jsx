import React from 'react'
import { Link } from 'react-router-dom'

function Navbar({lastChild, lastChildPath, lastChildAction, lastChildActionArgs}) {
    return (
        <nav className='navbar'>
            <ul>
                <li id='navbarTitle'><a>RESUME BUILDER</a></li>
                <li><Link onClick={() => {lastChildAction(...lastChildActionArgs)}} to={lastChildPath}>{lastChild}</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar
