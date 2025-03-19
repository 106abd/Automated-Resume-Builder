import './App.css'
import React, {useState} from 'react'
import {HashRouter, Routes, Route} from 'react-router-dom'
import './Components/ComponentStyling.css'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Builder from './Pages/Builder'

function App() {

  const [authToken, setAuthToken] = useState('')

  return (
    <>
      <HashRouter>
        <Routes>
          <Route exact path='/' element={<Login authToken={authToken} setAuthToken={setAuthToken}/>}/>
          <Route exact path='/signup' element={<SignUp />}/>
          <Route exact path='/builder' element={<Builder authToken={authToken} setAuthToken={setAuthToken}/>}/>
        </Routes>
      </HashRouter>
      
    </>
  )
}

export default App
