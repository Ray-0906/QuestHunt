import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleAuthCheck, initializeAuth } from './service/auth'
import LogoutButton from './Component/logout';
import StatusCard from './Component/Profile';
import { SignupFormDemo } from './Component/SignUp1';
import { LogInDemo } from './Component/login1';
import MissionForm from './Component/addMission';
import Carousel from './Component/Cardslider';
import MissionCard from './Component/MissionCard';
import SoloLevelingNavbar from './Component/nav';
import { Outlet } from 'react-router-dom';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
    dispatch(handleAuthCheck);
  }, [dispatch]);
  
  return (
    <>
    <div className='min-h-screen w-full bg-black'>
      <SoloLevelingNavbar/>
      <Outlet/>
    </div>
    
    </>
  )
}

export default App
