import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Ct from './Ct'

const Login = () => {
    const navigation=useNavigate()
    const [data, setData]= useState({"email":"", "pwd": ""})
    const obj=useContext(Ct)
    
    let fun=(e)=>{
        setData({...data, [e.target.name]:e.target.value})
    }

    let log=async()=>{
       await axios.post("http://localhost:5000/login",data).then((res)=>{
        if(res.data.token!=undefined){
            obj.updstore(res.data)
            navigation("/disp")
        }
       })
       
       setData({"email":"", "pwd": ""})
       
    }
    return (
        <div className="login-box">
            <h1 className="heading">Login to Todo App</h1>
            <div className="con1">
                <label className="label">Email</label>
                <input type="text" className="reg" placeholder='Enter email' name='email' value={data.email} onChange={fun}/>
            </div>
            <div className="con1">
                <label className="label">Password</label>
                <input type="password" className="reg" placeholder='Enter password' name='pwd' value={data.pwd} onChange={fun}/>
            </div>
            <button className='regbtn' onClick={log}>Login</button>
            <p className="signin">Don't have an account? <Link to="/">Register</Link></p>
        </div>
    )
}

export default Login
