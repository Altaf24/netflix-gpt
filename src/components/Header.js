import {React} from 'react'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser,removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { LOGO2 } from '../utils/constants';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
    })
    .catch((error) => {
      alert(error.message);
    })
    
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if(user) {
            const {uid,email,displayName} = user;
            dispatch(addUser({uid:uid,email:email,displayName:displayName}));
            navigate("/browse");
           

            
        }else{
        // user is logged out
           dispatch(removeUser());
           navigate("/");
         



        }
    });

    // UnSubscribe when component unmounts
    return () => unsubscribe();

    }, []);

    

  return (
    <>
    <div className='absolute w-screen px-8 py-4 bg-gradient-to-b from-black z-30 flex justify-between'>
        <img className='w-44'  src={LOGO2} alt="logo" />
        
        
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
