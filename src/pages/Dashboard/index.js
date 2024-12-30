import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Todos from './Todos'

const Dashboard = () => {
    return (
        <>
            <Routes>
                <Route index element={<Navigate to='/dashboard/todos/add' />} />
                <Route path='todos/*' element={<Todos />} />
            </Routes>
        </>
    )
}

export default Dashboard
