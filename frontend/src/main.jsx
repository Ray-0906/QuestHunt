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
import Home from './Pages/home.jsx';
import Ranking from './Pages/Ranking.jsx';
import ScrollToTop from './Component/ScrollFix.jsx';

const Layout = () => (
  <>
    <ScrollToTop />
    <App />
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: 
        <Home />
         },,
      { path: '/quests', element: 
      <AuthLayout><Mission /></AuthLayout>
       },
       { path: '/home', element: 
        <Home />
         },
      {
        path: '/login',
        element: (
          <AuthLayout Authentication={false}>
            <Login/>
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
          
            <AuthLayout><Profile /></AuthLayout>
         
          
        ),
      },
      {
        path: '/rankings',
        element: (
          
            <AuthLayout><Ranking /></AuthLayout>
         
          
        ),
      },
      
      {
        path: '/add-mission',
        element: (
         <AuthLayout><AddMission /></AuthLayout>
            
         
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
