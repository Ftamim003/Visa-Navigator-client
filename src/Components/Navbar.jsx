import { useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const location = useLocation();
    const handleLogout = () => {
        logOut(); // Clear user state and perform any additional logout logic
    };
    return (
        <div >
            <div className="">
                <nav className="flex items-center">
                    <div className="navbar ">
                        <div className="navbar-start">
                            <div className="dropdown">
                                <div tabIndex="0" role="button" className="btn btn-ghost md:hidden">
                                    <i className="fa-solid fa-bars bg-white rounded-full border text-base w-12 border-black-600 p-3 shadow-md "></i>
                                </div>
                                <ul
                                    tabIndex="0"
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-28 p-2 shadow">
                                    <li><NavLink to='/'> Home </NavLink></li>
                                    <li><NavLink to='/allVisa'>All Visa </NavLink></li>
                                    <li> <NavLink to="/tutorials">Tutorials</NavLink></li>
                                    {/* <li><NavLink to='/about'> About Us  </NavLink></li> */}

                                    {
                                        user && <>
                                            <li><NavLink to='/profile'> Profile  </NavLink></li>
                                        </>
                                    }
                                </ul>
                            </div>
                            <div className="flex gap-3 items-center">

                                <h1 className="font-bold text-2xl text-blue-600 "><NavLink to='/'>Visa Consultant</NavLink></h1>
                            </div>
                        </div>
                        <div className="navbar-center hidden md:flex">
                            <ul className="menu menu-horizontal px-1 text-lg">
                                <li ><NavLink to='/'> Home </NavLink></li>
                                <li><NavLink to='/allVisa'>All Visa </NavLink></li>

                                {/* <li><NavLink to='/about'> About Us  </NavLink></li> */}




                                {
                                    user && <>

                                        <li><NavLink to='/addVisa'>Add Visa</NavLink></li>
                                    </>
                                }

                                {
                                    user && <>
                                        <li><NavLink to='/myVisa'> My Visa  </NavLink></li>
                                    </>
                                }

                                {
                                    user && <>

                                        <li><NavLink to='/myApplication'>My Application</NavLink></li>
                                    </>
                                }
                            </ul>
                        </div>
                        <div className="navbar-end flex gap-7">
                            {!user ? (
                                <>
                                    <Link
                                        to="/auth/login"
                                        className="btn btn-primary hover:bg-blue-600 transition-colors duration-300"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/auth/register"
                                        className="btn btn-secondary hover:bg-blue-500 transition-colors duration-300"
                                    >
                                        Register
                                    </Link>
                                </>
                            ) : (
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={user.photoURL} alt="User Avatar" />
                                        </div>
                                    </label>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-[1] "
                                    >
                                        <li>
                                            <span className="font-bold">Hello, {user.displayName}</span>
                                        </li>
                                        
                                        <li>
                                            <button onClick={handleLogout} className="text-red-600">
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}

                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;