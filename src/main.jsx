import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Components/Main.jsx';
import Home from './Components/Home.jsx';
import AllVisas from './Components/AllVisas.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import AuthLayouts from './Components/Layouts/AuthLayouts.jsx';
import Login from './Components/Pages/Login.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: 'allvisa',
        element: <AllVisas></AllVisas>
      }

    ]
    
  },

  {
    path:"auth",
    element:<AuthLayouts></AuthLayouts>,
    children:[
      {
        path:'/auth/login',
        element:<Login></Login>
      },
      {
        
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
