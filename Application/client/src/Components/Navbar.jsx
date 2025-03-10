import React from 'react'
import { Link } from 'react-router-dom'

function Navbar({lastChildAction, lastChildPath}) {
    return (
        <nav className='navbar'>
            <ul>
                <li id='navbarTitle'><a>RESUME BUILDER</a></li>
                <li><Link to={lastChildPath}>{lastChildAction}</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar
