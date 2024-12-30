import { useAuthContext } from 'contexts/Auth'
import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ Component }) => {


    const { isAuth } = useAuthContext()

    if (!isAuth) return <Navigate to={"/auth/login"} />

    return (
        <>
            <Component />
        </>
    )
}

export default PrivateRoute
