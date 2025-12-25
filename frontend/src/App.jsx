import './App.css'
import Home from './pages/Home.jsx'
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import {  Routes, Route,  } from "react-router-dom";
function App() {


  return (
      //useRoutes hook to define application routes
    <>
        <Routes>
          <Route path='/' element={<Signup />} />//first register
          <Route path='/login' element={<Login />} />//then login
          <Route path='/home/*' element={<Home />} />//then the main app
        </Routes>
      
    </>
  )
}

export default App
