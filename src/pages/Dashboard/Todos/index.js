import React from 'react'
import Add from './Add'
import { Route, Routes } from 'react-router-dom'
import All from './All'

const Todos = () => {
    return (
        <>
            <Routes>
                <Route path='add' element={<Add />} />
                <Route path='all' element={<All />} />
            </Routes>
        </>
    )
}

export default Todos
