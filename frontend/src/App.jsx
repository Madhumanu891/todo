import React, { useState } from 'react'
import Register from './Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import './App.css'
import Disp from './Disp'
import Ct from "./Ct"


const App = () => {
  const [store, setStore]=useState({"name":"", "token":""})

  let updstore=(obj)=>{
    setStore({...store,...obj})
  }

  let obj={"store":store, "updstore":updstore}
  return (
    <BrowserRouter>
    <Ct.Provider value={obj}>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/disp' element={<Disp />} />
      </Routes>
      </Ct.Provider>
    </BrowserRouter>
  )
}

export default App
