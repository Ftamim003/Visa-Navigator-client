import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
    const {setUser,createNewUser,updateProfileUser,googleSignIn}=useContext(AuthContext);

    const navigate=useNavigate();
    const [error,setError]=useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const name = form.get("name");
        if (name.length < 5) {
            setError({ ...error, name: "must be more than 5 character" });
            return
        }else {
            setError((error) => ({ ...error, name: "" })); // Clear name error
        }
        const email = form.get("email");
        const photo = form.get("photo");
        const password = form.get("password");
        //console.log({name,email,photo,password})
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
       
        if (!passwordRegex.test(password)) {
            setError((prevError) => ({
                ...prevError,
                password: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
            }));
            return;
        } else {
            setError((error) => ({ ...error, password: "" })); // Clear password error
        }

        createNewUser(email, password)
            .then(result => {
                const user = result.user;
                setUser(user)
                updateProfileUser({ displayName: name, photoURL: photo })
                    .then(() => {

                        navigate("/");
                    })
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                //console.log(errorCode,errorMessage)
            });

    }

   const handleGoogleSignIn=()=>{
    googleSignIn()
    .then(()=>{
        navigate("/")
    })
   }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-orange-100 flex justify-center items-center p-4">
        <div className="card bg-white shadow-lg rounded-lg w-full max-w-lg p-8">
            <h2 className="text-center text-3xl font-bold text-blue-600 mb-6">
                Register Your Account
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-gray-700 font-semibold">Name</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        className="input input-bordered border-gray-300 focus:ring focus:ring-blue-200 rounded-lg"
                        required
                    />
                    {error.name && (
                        <label className="label text-xs text-red-500">{error.name}</label>
                    )}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-gray-700 font-semibold">Photo URL</span>
                    </label>
                    <input
                        type="text"
                        name="photo"
                        placeholder="Enter photo URL"
                        className="input input-bordered border-gray-300 focus:ring focus:ring-blue-200 rounded-lg"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-gray-700 font-semibold">Email</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="input input-bordered border-gray-300 focus:ring focus:ring-blue-200 rounded-lg"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-gray-700 font-semibold">Password</span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="input input-bordered border-gray-300 focus:ring focus:ring-blue-200 rounded-lg"
                        required
                    />
                    {error.password && (
                        <label className="label text-xs text-red-500">{error.password}</label>
                    )}
                </div>
                <div className="form-control mt-4">
                    <button className="btn bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-300">
                        Register
                    </button>
                </div>
            </form>
            <p className="text-center mt-6 text-gray-700 font-medium">
                Already have an account?{" "}
                <Link className="text-blue-500 font-semibold hover:underline" to="/auth/login">
                    Login
                </Link>
            </p>
            <div className="w-full mt-8">
                <button
                    onClick={handleGoogleSignIn}
                    className="btn bg-white border border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 w-full flex items-center justify-center py-2 px-4 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
                >
                    Login with Google
                </button>
            </div>
        </div>
    </div>
);
    
};

export default Register;