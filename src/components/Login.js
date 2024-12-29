import React, { useRef } from 'react'
import Header from './Header'
import { useState } from 'react'
import { checkValidateData } from '../utils/validate';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { auth } from '../utils/firebase';

import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { LOGO } from '../utils/constants';

const Login = () => {
  
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    
    const dispatch = useDispatch();

    const name  = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () =>{
      // Validate the form data
      const message = checkValidateData(email.current.value, password.current.value);
      setErrorMessage(message);

      if(message) return;
      
      // Sign In/Sign Up the user
      if(!isSignInForm) {
        // Create a user
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
          .then(() => {
            const {uid, email, displayName} = auth.currentUser;
            dispatch(addUser({
              uid: uid,
              email: email,
              displayName: displayName,
            }));
            
          }).catch((error) => {
            // An error occurred
            setErrorMessage(error.message);
           
          });
         
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
      }
      else {
        // Sign In the user
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          
         
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
      }

      

    };

    const toggleSignInForm =() => {
        setIsSignInForm(!isSignInForm);

    }
    
  return (
    <div>
      <Header/>
      <div className='absolute'>
      <img   src={LOGO} alt='logo'/>
      
      </div>
      <form
      onSubmit={(e) => e.preventDefault()}
       className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-90'>
      <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
      { !isSignInForm && (
         <input
         ref={name} type='text' 
         placeholder='Full Name' 
         className='p-4 m-4 w-full bg-gray-700'
         />
         )}
         <input 
         ref={email}
         type='email'
              placeholder='Email or phone number' 
              className='p-4 m-4 w-full bg-gray-700'
        />
       
         <input 
         ref={password}
         type='password' 
         placeholder='Enter Password' 
         className='p-4 m-4 w-full bg-gray-700'
         />
         <p className='p-4 m-4 font-bold text-red-600 text-lg py-2' >{errorMessage}</p>
         <button className=' p-2 m-4 bg-red-800 w-full rounded-lg' onClick={handleButtonClick}>
         {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className='ml-5 py-4 cursor-pointer' onClick={toggleSignInForm}> {isSignInForm ? "New to Netflix? Sign Up Now" : "Already Registered? Sign In Now.."}</p>
      </form>
    </div>
  )
}

export default Login;
