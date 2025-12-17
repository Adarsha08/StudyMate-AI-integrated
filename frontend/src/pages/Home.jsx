import React from 'react'
import Navbar from '../components/Navbar.jsx'
import {Routes, Route,} from 'react-router-dom'
import Mynotes from './Mynotes.jsx'
import Login  from './Login.jsx'



const Home = () => {
  return (
    <>
      <div className="flex h-full w-full "  >
        <div className="bg-[#0F172A] text-white p-3 w-70 h-screen" >
          <Navbar />
        </div>
        
        <div className=" bg-[#1E1E1E] w-full text-white p-3 h-screen overflow-y-auto" >
          <Routes>
            <Route path="/" element={<Mynotes/>} />
            <Route path="/login" element={<Login/>} />
            
          </Routes>
        </div>
      </div>
    </>
  )
}

export default Home