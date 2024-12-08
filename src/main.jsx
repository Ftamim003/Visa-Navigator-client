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
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import NotFound from './Components/NotFound.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: async () => {

          const response = await fetch("https://visa-navigator-server.vercel.app/recentVisa");
          return response.json();
        }
      },

    ]

  },
  {

    path: "/allVisa",
    element: <AllVisas></AllVisas>,
    loader: () => fetch("https://visa-navigator-server.vercel.app/visa")
  },
  {
    path: "/addVisa",
    element: <PrivateRoute><AddVisa></AddVisa></PrivateRoute>

  },

  {

    path: "/myVisa",
    element: <PrivateRoute><MyVisa></MyVisa></PrivateRoute>
  },
  {
    path: "/myApplication",
    element: <PrivateRoute><MyApplications></MyApplications></PrivateRoute>,


  },
  {
    path: "/visaDetails/:id",
    element: <PrivateRoute><VisaDetails></VisaDetails></PrivateRoute>,
    loader: ({ params }) => fetch(`https://visa-navigator-server.vercel.app/visa/${params.id}`)
  },

  {
    path: "/auth",
    element: <AuthLayouts></AuthLayouts>,
    children: [
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "register",
        element: <Register></Register>
      }
    ]
  },
  

  {
    path: "*",
    element: <div className='text-red-600 text-5xl text-center mt-12'>Ooops Page Not Found!!!</div>
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
