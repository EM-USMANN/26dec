import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from 'config/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'


const AuthContext = createContext()

const initialStae = { isAuth: false, user: {} }



const AuthProvider = ({ children }) => {

    const [state, setState] = useState(initialStae)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setState(s => ({ ...s, isAuth: true, user }))
                console.log('user', user)
            } else {
                console.log("user is logout")
            }
        });

    }, [])


    const handleLogout = () => {
        signOut(auth)

            .then(() => {
                setState(initialStae)
                window.notify("Logout successful", "success")

            })
            .catch(error => {
                window.notify("Something went wrong while loogging out the user", "error")
                console.error(error)
            })
    }

    return (
        <AuthContext.Provider value={{ ...state, setAuthState: setState, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)

export default AuthProvider
