import React from 'react'
import Header from './Header'
import { useState } from 'react'

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const toggleSignInForm =() => {
        setIsSignInForm(!isSignInForm);

    }
  return (
    <div>
      <Header/>
      <div className='absolute'>
      <img   src="https://assets.nflxext.com/ffe/siteui/vlv3/150c4b42-11f6-4576-a00f-c631308b1e43/web/IN-en-20241216-TRIFECTA-perspective_915a9055-68ad-4e81-b19a-442f1cd134dc_large.jpg" alt='logo'/>
      
      </div>
      <form className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-90'>
      <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
      { !isSignInForm && (
         <input type='text' 
         placeholder='Full Name' 
         className='p-4 m-4 w-full bg-gray-700'
         />
         )}
         <input type='email'
              placeholder='Email or phone number' 
              className='p-4 m-4 w-full bg-gray-700'
        />
       
         <input type='password' 
         placeholder='Enter Password' 
         className='p-4 m-4 w-full bg-gray-700'
         />
         <button className=' p-4 m-4 bg-red-800 w-full rounded-lg'>
         {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className='ml-5 py-4 cursor-pointer' onClick={toggleSignInForm}> {isSignInForm ? "New to Netflix? Sign Up Now" : "Already Registered? Sign In Now.."}</p>
      </form>
    </div>
  )
}

export default Login;
