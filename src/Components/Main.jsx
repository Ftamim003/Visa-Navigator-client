import React from 'react';

import { Outlet } from "react-router-dom";
import Footer from './Footer/Footer';
const Main = () => {
    return (
        <div className=''>
           
            <div >

                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;


