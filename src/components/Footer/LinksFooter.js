import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Assets/logo.png'; // Assuming you have a logo image

const LinksFooter = () => {
    return (
        <footer className="footer bg-dark py-4 text-white p-5">
            <div className="container p-2 mt-5">
                <div className="row">
                    {/* Logo Column */}
                    <div className="col-md-4 text-center mb-4 mb-md-0">
                        <img src={logo} alt="Logo" className="footer-logo" />
                        <p className="mt-3">Your Study Companion</p>
                    </div>

                    {/* Links Column */}
                    <div className="col-md-4 text-center mb-4 mb-md-0">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/" className="footer-link text-white">Home</Link>
                            </li>
                            <li>
                                <Link to="/about" className="footer-link text-white">About</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="footer-link text-white">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="col-md-4 text-center">
                        <h5>Contact Us</h5>
                        <p>Email: usman@gmail.com</p>
                        <p>Phone: 0306 1270083</p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center mt-4 text-light">
                    <p className='copyright'>&copy; 2025 Your Website. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default LinksFooter;
