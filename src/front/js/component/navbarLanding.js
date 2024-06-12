import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../../styles/navbarlanding.css';
import navbarlogo from "/workspaces/JDW-fitness-final-project/src/front/img/navbar-logo.png"

export const NavbarLanding = () => {
    return (
        <nav className="navbar navbar-landing navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid me-0 d-flex align-items-center">
                <img src={navbarlogo} className="navbar-logo me-auto" alt="Logo" />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link fw-bold cursor-pointer" to="services"  duration={1000}>Our Service</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold cursor-pointer" to="why-choose-us"  duration={1000}>Why Choose Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold cursor-pointer" to="offers"  duration={1000}>Our Special Functionalities</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold cursor-pointer" to="testimonials"  duration={1000}>Testimonials</Link>
                        </li>
                    </ul>
                </div>
                <Link to="/signup">
				    <button className="btn btn-rounded btn-signup ms-1 fw-bold" >Sign Up</button>
			    </Link>
                <Link to="/login">
				    <button className="btn btn-rounded btn-login ms-3 fw-bold" >Login</button>
			    </Link>
            </div>
        </nav>
    );
};
