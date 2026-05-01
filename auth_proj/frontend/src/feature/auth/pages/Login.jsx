import React from 'react'
import '../auth.form.scss'
import { useNavigate,Link } from 'react-router';
import { useState } from 'react';
import { useauth } from '../hooks/useauth';

const Login = () => {
const {loading,handlelogin}=useauth();
const [email,setemail]=useState("");
const [password,setpassword]=useState("")



const navigate=useNavigate();
  const handleSubmit=async (e)=>{
    e.preventDefault();  //issai submit pr click krnai pr pg reload nahi hoga
    try{
      await handlelogin({email,password});
      navigate('/');
    } catch(err){
      console.error(err);
      alert('Login failed');
    }
  }
if(loading)
{
  return (<main><h1>loading.......</h1></main>)
}

  return (
    <main>
      <div className="form-container">
        <h1>login</h1>
        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input onChange={(e)=>{setemail(e.target.value)}}
             type="email" id='email' name='email' placeholder='enter your email id' value={email} required />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input      onChange={(e)=>{setpassword(e.target.value)}}

             type="password" id='password' name='password' placeholder='enter your password' value={password} required />
          </div>

          <button className='button primary-button'>Login</button>
        </form>
                <p>Donot  have account? <Link to={'/register'}>Register</Link> </p>
        
      </div>
    </main>
  )
}

export default Login;
