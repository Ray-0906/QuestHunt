import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { handleAuthCheck, initializeAuth } from './service/auth'

import { Outlet } from 'react-router-dom';
import Navbar from './Component/nav';
import SoloLevelingBackground from './Component/bg';
import SoloLevelingFooter from './Component/Footer';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
    dispatch(handleAuthCheck);
  }, [dispatch]);
 
  return (
    <>
     <div className="flex flex-col w-full min-h-screen">
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
