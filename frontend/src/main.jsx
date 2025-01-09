import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Profile from './Pages/Profile.jsx';
import AddMission from './Pages/AddMission.jsx';
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import Mission from './Pages/Mission.jsx';
import AuthLayout from './Component/Authlayout.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: 
      <AuthLayout><Mission /></AuthLayout>
       },
      {
        path: '/login',
        element: (
          <AuthLayout Authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: '/signup',
        element: (
          <AuthLayout Authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      }, {
        path: '/profile',
        element: (
          
            <Profile />
         
          
        ),
      },
      
      {
        path: '/add-mission',
        element: (
         
            <AddMission />
         
        ),
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>

)
