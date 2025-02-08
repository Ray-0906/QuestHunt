import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { handleAuthCheck, initializeAuth } from './service/auth'

import { Outlet } from 'react-router-dom';
import Navbar from './Component/nav';
import SoloLevelingBackground from './Component/bg';
import SoloLevelingFooter from './Component/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
    dispatch(handleAuthCheck);
  }, [dispatch]);
 
  return (
    <>
     <div className="flex flex-col w-full min-h-screen">
     <ToastContainer position="top-right" autoClose={3000} />
     <SoloLevelingBackground/>
     <Navbar/>
     <main className="flex-grow w-full">


      <Outlet/>
      </main>
      <SoloLevelingFooter />
    </div>
   
    </>
  )
}

export default App
