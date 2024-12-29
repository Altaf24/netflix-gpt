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
import { toggleGptSearchView } from '../utils/gptSlice';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  const handleGptSearchClick = () => {

    dispatch(toggleGptSearchView());
  };
  
  const handleLanguageChange = (event) => {
    console.log(event.target.value);
    const selectedLanguage = event.target.value;
    dispatch(changeLanguage(selectedLanguage));
  };

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
        
        
      {user && (
        <div className='flex p-2'>
            { showGptSearch && (
              <select className='p-2 m-2 bg-gray-900 text-white' onChange={handleLanguageChange}>
              {SUPPORTED_LANGUAGES.map((language) => (
                <option key={language.identifier} value={language.identifier}>
                  {language.name}
                </option>
              ))}
             
            </select>)
            }
            <button className='bg-red-600 mx-4 my-2 text-white px-4 py-2 rounded-lg'
            onClick={handleGptSearchClick}
            >
             {showGptSearch ? "Homepage" : "GPT Search" } 
            </button>
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
