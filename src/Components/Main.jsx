import React from 'react';
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from './Footer/Footer';
const Main = () => {
    return (
        <div>
           
            <div >

                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;


