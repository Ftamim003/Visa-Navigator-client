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
        <div className="min-h-screen flex justify-center items-center">
        <div className="card bg-base-100 w-full max-w-lg shrink-0 p-10">
            <h2 className="text-center text-2xl font-semibold ">Register Your Account</h2>
            <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>

                    <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                    {
                        error.name && (<label className="label text-xs text-red-500">
                            {error.name}
                            
                        </label>)
                    }
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="text" name="photo" placeholder="photo-url" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                    {error.password && (
    <label className="label text-xs text-red-500">
        {error.password}
    </label>
)}
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary hover:bg-blue-600 transition-colors duration-300">Register</button>
                </div>
            </form>
            <p className="text-center font-semibold"> Already have an account? <Link className="text-red-500" to='/auth/login'>Login</Link></p>
            <div className="*:w-full mt-5">
                <button onClick={handleGoogleSignIn} className="btn text-blue-600">
                    
                    Login with Google
                </button>
            </div>
        </div>
    </div>
    );
};

export default Register;