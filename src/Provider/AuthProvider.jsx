import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";


export const AuthContext=createContext();
const googleProvider= new GoogleAuthProvider();


const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);

    const [loading,setLoading]=useState(true);

    const createNewUser = (email,password)=>{

        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const userLogin=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut=()=>{
        setLoading(true)
        return signOut
    }

    const authInfo={
        user,
        createNewUser,
        userLogin,
        logOut,

    }
    return <AuthContext.Provider value={authInfo}>

       {children}
    </AuthContext.Provider>
};

export default AuthProvider;