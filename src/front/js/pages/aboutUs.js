import React, { useContext } from "react";
import { useMediaQuery } from 'react-responsive'
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/landing.css";
import { NavbarLanding } from "../component/navbarLanding";
import { Testimonials } from "../component/testimonials";
import { FooterDesign } from "../component/footerNew";
import headerimg from "../../img/headerimg.webp";
import teamImg from "../../img/team.jpg";
import jorgeImg from "../../img/jorge 4.jpg";
import daniImg from "../../img/dani4.jpg";

export const AboutUs = () => {
    const { store, actions } = useContext(Context);
    const isLargeScreen = useMediaQuery({ query: '(min-width: 765px)' });

    return (
        <div className="landing-page">
            <NavbarLanding />
            <header className="text-light text-center py-5" style={{ 
                backgroundImage: `url(${headerimg})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center 15%', 
                backgroundRepeat: 'no-repeat',
                height: '65vh'
            }}>
                <div className="container main-title mt-5">
                </div>
            </header>
            <div className="site-section d-flex justify-content-center">
                <div className="card col-10 mb-3 mt-5">
                    <div className="row g-0">
                        <div className="col-md-6 col-12">
                        <img src={teamImg} alt="Team" className={`img-fluid h-100 ${isLargeScreen ? 'rounded-start-4' : 'card-img-top'}`}/>
                        </div>
                        <div className="col-md-6 col-12 align-items-center">
                        <div className="card-body p-5">
                            <h2 className="card-title text-center text-dark mb-3 fw-bold justify-self-center">About Our History</h2>
                            <p className="text-dark mb-3">We started at 4GeeksAcademy together, making the decision to learn programming in order to offer our services later on.</p>
                            <p className="text-dark mb-3">After joining 4Geeks, we started our prework process, catching up on some very basic knowledge we already had of Python thanks to MoureDev and self-taught work.</p>
                            <p className="text-dark mb-3">Finally, after passing the selection process, we officially started the course, where we met our classmates from Full Stack Spain 61. We have finally reached this point with the knowledge we have acquired over these 18 weeks, presenting this final project as a demonstration of our learning.</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="site-section">
                <div className="container">
                    <div className="row justify-content-center mb-5">
                        <div className="col-md-7 text-center">
                            <h2 className="text-dark mb-3 fw-bold mt-5">Our Staffs</h2>
                            <p className="text-dark mb-3">Our final team is composed of JorgeAJT and DaniWallaceDev; however, we want to give an honorable mention to Walter Rivero, who accompanied us for some time but eventually had to leave.</p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
    <div className="card col-5 mb-4 ms-5 mb-lg-5 text-center d-flex flex-column align-items-center">
                            <img src={daniImg} alt="Card image cap" className="card-img-top img-fluid rounded mt-3 mb-3 w-75" style={{ maxWidth: '200px', height: 'auto' }} />
                            <div className="card-header">
                            <h3 className="card-title text-dark fw-semibold">DaniWallaceDev</h3>
                                </div>
                                <div className="card-body">
                                <p className="caption text-dark fw-semibold">Full Stack Junior Developer</p>
                                <p className="card-text">Member of the JDW Fitness development team, bringing ideas and a positive attitude to the project from the outset, with intermediate knowledge of the fitness industry and a strong desire to develop and collaborate.</p>
                                </div>
                                <div className="card-footer">
                                <ul className="social-icons d-flex justify-content-center">
                                    <li><a href="https://github.com/DaniWallaceDev/"><i className="github-card fa-brands fa-github me-3"></i></a></li>
                                    <li><a href="https://www.linkedin.com/in/daniwallacedev/"><i className="linkedin-card fab fa-linkedin-in me-3"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card col-5 mb-4 ms-5 mb-lg-5 text-center d-flex flex-column align-items-center">
                            <img src={jorgeImg} alt="Image" className="img-fluid rounded mt-3 mb-3 w-75" style={{ maxWidth: '200px', height: 'auto' }} />
                            <div className="card-header">
                            <h3 className="card-title text-dark fw-semibold">JorgeAJT</h3>
                                </div>
                                <div className="card-body">
                                <p className="caption text-dark fw-semibold">Full Stack Junior Developer</p>
                                <p className="card-text">Member of the JDW Fitness development team, bringing discipline and theoretical insights as a fitness industry professional to the project, eager to contribute and collaborate.</p>
                                </div>
                                <div className="card-footer">
                                    <ul className="social-icons d-flex justify-content-center">
                                        <li><a href="https://github.com/JorgeAJT/"><i className="githuber fa-brands fa-github me-3"></i></a></li>
                                        <li><a href="https://www.linkedin.com/in/jorgeajt/"><i className="linkeder fab fa-linkedin-in me-3"></i></a></li>
                                    </ul>
                            </div>
                        </div>
</div>
                </div>
            </div>
            <Testimonials />
            <FooterDesign />
        </div>
    );
};
