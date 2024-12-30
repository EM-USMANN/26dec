import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { auth, firestore } from 'config/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'


const AuthContext = createContext()

const initialStae = { isAuth: false, user: {} }



const AuthProvider = ({ children }) => {

    const [state, dispatch] = useState(initialStae)
    const [isAppLoading, setIsAppLoading] = useState(true)

    const readProfile = useCallback(async (user) => {
        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const user = docSnap.data()
            console.log('firestore user data', user)
            dispatch(s => ({ ...s, isAuth: true, user }))
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }

        setIsAppLoading(false)
    }, [])


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('auth user data', user)
                readProfile(user)
            } else {
                console.log("user is logout")
                setIsAppLoading(false)
            }
        });

    }, [])




    const handleLogout = () => {
        signOut(auth)

            .then(() => {
                dispatch(initialStae)
                window.notify("Logout successful", "success")

            })
            .catch(error => {
                window.notify("Something went wrong while loogging out the user", "error")
                console.error(error)
            })
    }

    return (
        <AuthContext.Provider value={{ ...state, dispatch, handleLogout, isAppLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)

export default AuthProvider
