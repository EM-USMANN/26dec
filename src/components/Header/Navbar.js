import React from 'react'
import { useAuthContext } from 'contexts/Auth'
import { Link } from 'react-router-dom'
import { Space } from 'antd'

const Navbar = () => {

    const { isAuth, handleLogout } = useAuthContext()

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
                    <div className="container">
                        <Link to={"/"} className="navbar-brand">Brand</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to={"/"} className="nav-link active" aria-current="page">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/about"} className="nav-link">About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/contact"} className="nav-link">Contact</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Services
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item">Designing</a></li>
                                        <li><a className="dropdown-item" >Development</a></li>
                                        <li><a className="dropdown-item" >Marketing</a></li>
                                    </ul>
                                </li>

                            </ul>
                            <div className="d-flex">

                                {!isAuth
                                    ? <Space>
                                        <Link to={"/auth/login"} className='btn btn-light'>Login</Link>
                                        <Link to={"/auth/register"} className='btn btn-light'>Register</Link>
                                    </Space>
                                    :
                                    <Space>

                                        <Link to={"/auth/login"} className="btn btn-light" onClick={handleLogout}>Logout</Link>
                                        <Link to={"/dashboard"} className="btn btn-secondary ms-2">Dashboard</Link>
                                    </Space>

                                }

                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Navbar
