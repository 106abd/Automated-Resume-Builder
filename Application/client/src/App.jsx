import './App.css'
import {HashRouter, Routes, Route} from 'react-router-dom'
import './Components/ComponentStyling.css'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Builder from './Pages/Builder'

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/builder' element={<Builder />}/>
        </Routes>
      </HashRouter>
      
    </>
  )
}

export default App
