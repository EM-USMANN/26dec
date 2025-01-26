import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthContext } from 'contexts/Auth'
import Frontend from './Frontend'
import Auth from './Auth'
import Dashboard from './Dashboard'
import PrivateRoute from 'components/PrivateRoute'
import Notes from './Notes'
import ViewNotes from './Notes/ViewNotes'
import EditNotes from './Notes/EditNotes'
import ViewNotePage from "../pages/Notes/ViewNotePage";




const Index = () => {

    const { isAuth } = useAuthContext()

    return (
        <>
            <Routes>
                <Route path='/*' element={<Frontend />} />
                <Route path='auth/*' element={!isAuth ? <Auth /> : <Navigate to={"/"} />} />
                <Route path='dashboard/*' element={<PrivateRoute Component={Dashboard} />} />
                <Route path='add-note' element={<Notes />} />
                <Route path='viewNotes' element={<ViewNotes />} />
                <Route path="/edit-notes/:id" element={<EditNotes />} />
                <Route path="/view-note/:noteId" element={<ViewNotePage />} />


            </Routes>
        </>
    )
}

export default Index
