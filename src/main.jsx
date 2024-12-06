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
import Register from './Components/Pages/Register.jsx';

import MyApplications from './Components/MyApplications.jsx';
import AddVisa from './Components/AddVisa.jsx';
import MyVisa from './Components/MyVisa.jsx';
import VisaDetails from './Components/VisaDetails.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: async ()=> {

          const response = await fetch("http://localhost:5000/recentVisa");
          return response.json();
        }
      },
      {
        path: '/allVisa',
        element: <AllVisas></AllVisas>,
        loader: ()=> fetch("http://localhost:5000/visa")
      },

      
    ]
    
  },
  {
    path:"/addVisa",
    element:<AddVisa></AddVisa>

  },

  {

    path:"/myVisa",
    element:<MyVisa></MyVisa>
  },
  {
    path:"/myApplication",
    element:<MyApplications></MyApplications>

  },
 {
  path:"/visaDetails/:id",
  element:<VisaDetails></VisaDetails>,
  loader:({params})=> fetch(`http://localhost:5000/visa/${params.id}`)
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
        path:'/auth/register',
        element:<Register></Register>
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
