import React, { useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'

const Register = () => {
  const [obj, setObj] = useState({ "email": "", "name": "", "pwd": "" })

  const fun = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value })
  }

  const reg = async () => {

    await  axios.post("http://localhost:5000/register", {
...obj
    }).then((res) => {
      console.log(res.data)
    }).catch((e) => {
      console.log(e)
    })
    setObj({ "email": "", "name": "", "pwd": "" })

  }
  return (
    <div className="register-box">
      <h1 className="heading">Register to Todo App</h1>
      <div className="con1">
        <label className="label">Email</label>
        <input type="text" className="reg" placeholder='Enter email' name='email' value={obj.email} onChange={fun} />
      </div>
      <div className="con1">
        <label className="label">Name</label>
        <input type="text" className="reg" placeholder='Enter Name' name='name' value={obj.name} onChange={fun} />
      </div>
      <div className="con1">
        <label className="label">Password</label>
        <input type="password" className="reg" placeholder='Enter Password' name='pwd' value={obj.pwd} onChange={fun} />
      </div>
      <button className='regbtn' onClick={reg}>Register</button>
      <p className="signin">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}

export default Register
