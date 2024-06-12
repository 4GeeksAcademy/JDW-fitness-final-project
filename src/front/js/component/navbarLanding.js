import React from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import '../../styles/navbarlanding.css';
import navbarlogo from "/workspaces/JDW-fitness-final-project/src/front/img/sidebar-logo.png"

export const NavbarLanding = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        if (location.pathname !== path) {
            navigate(path);
            window.scrollTo(0, 0);
        }
    };

    return (
        <nav className="navbar navbar-landing navbar-expand-lg navbar-light bg-light fixed-top">
             <button 
                className="navbar-logo-btn"
                onClick={() => handleNavigation('/')}
                style={{ background: 'none', border: 'none', padding: 0 }}
            >
                <img src={navbarlogo} className="navbar-logo justify-self-end" alt="Logo" />
            </button>
            <div className="container-fluid d-flex align-items-center justify-content-end">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                       <li className="nav-item">
                            <button 
                                className="nav-link fw-bold cursor-pointer btn btn-link"
                                onClick={() => handleNavigation('/functionalities')}
                            >
                                Our Special Functionalities
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className="nav-link fw-bold cursor-pointer btn btn-link"
                                onClick={() => handleNavigation('/why-choose-us')}
                            >
                                Why Choose Us
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className="nav-link fw-bold cursor-pointer btn btn-link"
                                onClick={() => handleNavigation('/about')}
                            >
                                About Us
                            </button>
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
