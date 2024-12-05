import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
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
        return signOut(auth)
    }

    const googleSignIn=()=>{
        
        return signInWithPopup(auth, googleProvider)
    }

    const updateProfileUser=(updateData)=>{
        return updateProfile(auth.currentUser,updateData)
    }

    const forgetPassword=(email)=>{
        return sendPasswordResetEmail(auth,email)
    }

    const updateUserProfile= async (profile)=>{
        if (auth.currentUser){
            return await updateProfile(auth.currentUser,profile);
        }

        throw new Error ("No authenticate user found! ");
    }

    useEffect(()=>{

        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>{
            unsubscribe();
        }
    },[])

    const authInfo={
        user,
        loading,
        setUser,
        createNewUser,
        updateProfileUser,
        userLogin,
        logOut,
        googleSignIn,
        forgetPassword,

        updateUserProfile

    }
    return <AuthContext.Provider value={authInfo}>

       {children}
    </AuthContext.Provider>
};

export default AuthProvider;