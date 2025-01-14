import  'lucide-react'
import Navbar from'../src/components/Navbar/Navbar'
import Home from '../src/pages/Home/Home'
import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import { ToastContainer, toast } from 'react-toastify';
const App = () => {
  return (
    <div>
      <ToastContainer theme='dark'/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
     
    </div>
  )
}

export default App
