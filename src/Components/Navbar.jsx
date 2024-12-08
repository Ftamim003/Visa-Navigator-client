import { useContext } from "react";
import { Link, NavLink, useLocation, } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Lottie from "lottie-react";
import animationData from "../Animation - 1733596939443.json";
const Navbar = () => {
    const { user,setUser, logOut } = useContext(AuthContext)
    const location = useLocation();
    
    
    const handleLogout = async () => {
        try {
            await logOut();
            setUser(null); // Clear user state explicitly
           // Redirect to login page after logout
        } catch (error) {
            console.error("Logout failed", error);
        }
    };
    return (
        <div >
            <div className="bg-gradient-to-r from-blue-100 to-orange-100">
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
                            <div className="flex items-center w-72">

                                <h1 className="font-bold text-2xl text-orange-600 hidden md:block"><NavLink to='/'>
                                Skyline Visas  </NavLink> </h1>
                                <div className="text-center mt-5 ">

                                    <Lottie animationData={animationData} loop={true} className=" w-12" />
                                </div>

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
                                        className="btn btn-primary hover:bg-green-600 transition-colors duration-300 mr-6"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/auth/register"
                                        className="btn bg-orange-400 hover:bg-blue-500 transition-colors duration-300"
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