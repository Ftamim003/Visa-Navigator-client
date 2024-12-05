import React from 'react';
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-230px)] w-11/12 mx-auto">

                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Main;