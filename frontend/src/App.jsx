import './App.css'
import Home from './pages/Home.jsx'
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import {  Routes, Route,  } from "react-router-dom";
function App() {


  return (
    <>
      
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      
    </>
  )
}

export default App
