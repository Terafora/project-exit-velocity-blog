import React from 'react';
import '../stylings/Navbar.scss';

const Navbar = () => {
    return (
        <div className="navbar-wrapper">
            {/* First Shadow div */}
            <div className="navbar-shadow"></div>
            <div className="navbar-shadow navbar-shadow-two"></div>

            {/* Actual navbar (moving, but without items) */}
            <nav className="navbar"></nav>
            <div className="navbar navbar-two"></div>
            {/* Navbar items moved outside the navbar */}
            <ul className="navbar-list">
                <li className="navbar-item"><a href="#home">Home</a></li>
                <li className="navbar-item"><a href="#about">About</a></li>
                <li className="navbar-item"><a href="#blog">Blog</a></li>
                <li className="navbar-item"><a href="#contact">Contact</a></li>

                {/* Dropdown Menu */}
                <li className="navbar-item dropdown">
                    <a href="#languages" className="dropdown-toggle">Languages</a>
                    <ul className="dropdown-menu">
                        <li className="dropdown-item"><a href="#english">English</a></li>
                        <li className="dropdown-item"><a href="#french">French</a></li>
                        <li className="dropdown-item"><a href="#japanese">Japanese</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
