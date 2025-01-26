import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Contact from './Contact'

const Frontend = () => {
    return (
        <>

            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='about' element={<About />} />
                <Route path='contact' element={<Contact />} />
            </Routes>
            <Footer />

        </>
    )
}

export default Frontend
