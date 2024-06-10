import React from 'react';
import { Link } from "react-scroll";
import '../../styles/navbarlanding.css';

export const NavbarLanding = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container me-0">
                <a className="navbar-brand text-gradient" href="#"><h1>JDW Fitness</h1></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link fw-bold cursor-pointer" to="services" smooth={true} duration={1000}>Our Service</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold cursor-pointer" to="why-choose-us" smooth={true} duration={1000}>Why Choose Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold cursor-pointer" to="offers" smooth={true} duration={1000}>Our Special Functionalities</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold cursor-pointer" to="testimonials" smooth={true} duration={1000}>Testimonials</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
