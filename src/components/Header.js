import React from 'react'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
    })
    .catch((error) => {
      alert(error.message);
    })
    console.log("signout");
  }

  return (
    <>
    <div className='absolute w-screen px-8 py-4 bg-gradient-to-b from-black z-20 flex justify-between'>
        <img className='w-44'  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/225px-Netflix_2015_logo.svg.png" alt="logo" />
        
        
        {user && (<div className='flex p-2'>
      <button onClick={handleSignOut} 
      className='bg-red-600 text-white px-4 py-2 rounded-lg'>
        Sign Out
      </button>
    </div>
        )}
    </div>
    
    
    </>
  )
}

export default Header
