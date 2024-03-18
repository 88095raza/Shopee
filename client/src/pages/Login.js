import React from 'react'
import {githubLogo,googleLogo} from "../assets";
import { ToastContainer, toast } from 'react-toastify';
import { addUser,removeUser } from '../redux/shopeeSlice';
import { useDispatch } from 'react-redux';
import {
   GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut, 
 } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate("");
  const auth=getAuth();
  const provider=new GoogleAuthProvider();
 const handleGoogleLogin=(e)=>{
    e.preventDefault();
    signInWithPopup(auth,provider)
    .then((result)=>{
      const user = result.user
      dispatch(
        addUser({
        _id: user.uid,
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      }))
      setTimeout(() => {
        navigate("/");
      }, 1500)
    })
  
      .catch((error) =>{
        console.log(error)
      })
  }
  // sign out===============
 const handleGoogleSignout=(e)=>{
    e.preventDefault();
    signOut(auth).then(()=>{
      toast.success("Log out successfully")
      dispatch(removeUser());
    },1500)
      .catch((error) =>{
        console.log(error)
      })
  }

  return (
    <div className='flex items-center justify-center flex-col py-20 gap-10'>
      <div className='w-full flex items-center justify-center gap-10'>
       <div onClick={handleGoogleLogin} className='px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700
        hover:border-slate-400 cursor-pointer items-center
        hover:text-slate-900 hover:shadow transition duration-150'>
       <img  className='w-8 flex' src={googleLogo} alt="google" />
        <span className='text-base text-gray-900'>sign in with google</span>
       </div>
       <button onClick={handleGoogleSignout} className=' bg-black  text-white py-2.5 text-base px-8 rounded-md shadow-sm
        hover:bg-gray-800 focus:outline-none focus:shadow-outline-blue 
       active:bg-black transition duration-300 ease-in-out'>Sign out</button>
      </div>

      <div className='w-full flex items-center justify-center gap-10'>
       <div className='px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700
        hover:border-slate-400 cursor-pointer items-center 
        hover:text-slate-900 hover:shadow transition duration-150'>
       <img  className='w-8 flex' src={githubLogo} alt="google" />
        <span className='text-base text-gray-900'>sign in with github</span>
       </div>
       <button className=' bg-black  text-white py-2.5 text-base px-8 rounded-md shadow-sm
        hover:bg-gray-800 focus:outline-none focus:shadow-outline-blue 
       active:bg-black transition duration-300 ease-in-out'>Sign Out</button>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default Login