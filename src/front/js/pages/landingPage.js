import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/landing.css";
import { NavbarLanding } from "../component/navbarLanding";
import { Testimonials } from "../component/testimonials";
import { FooterDesign } from "../component/footerNew";
import headerimg from "/workspaces/JDW-fitness-final-project/src/front/img/headerimg.webp";

export const LandingPage = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="landing-page">
            <NavbarLanding />
            <header className="text-light text-center py-5" style={{ 
                backgroundImage: `url(${headerimg})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center 15%', 
                backgroundRepeat: 'no-repeat',
                height: '65vh' // Ajusta la altura según sea necesario
            }}>
                <div className="container mt-5">
                    <h1 className="text-dark-center py-5">We give solutions to your training</h1>
                    <Link to="/signup">
				        <button className="btn btn-dark ms-3 mb-3 fw-bold" >Sign Up</button>
			        </Link>
                    <Link to="/login">
				        <button className="btn btn-light ms-3 mb-3 fw-bold" >Login</button>
			        </Link>
                </div>
            </header>
            <section id="services" className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5 text-primary fw-bold">What We Offer</h2>
                    <div className="row">
                        <div className="col-md-4 d-flex">
                            <div className="card flex-fill text-center border-primary">
                                <div className="card-body">
                                    <h3 className="card-title">Contact with personal trainers</h3>
                                    <p className="card-text">You can find personal trainers in your city and match with them to get the best training plans</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex">
                            <div className="card flex-fill text-center border-primary">
                                <div className="card-body">
                                    <h3 className="card-title">Are u a personal trainer?</h3>
                                    <p className="card-text">Look for clients and people who want to be trained here to get experience for your CV</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex">
                            <div className="card flex-fill text-center border-primary">
                                <div className="card-body">
                                    <h3 className="card-title">Customize your gymrat profile!</h3>
                                    <p className="card-text">Customizing your profile going to help you to get personal trainers easier!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="why-choose-us" className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5 text-primary fw-bold">Why Choose Us</h2>
                    <p className="text-center text-dark fw-bold">Because we are the only service that gives you the posibilidad to match with trainers or clients with your same needs</p>
                    <div className="row text-center">
                        <div className="col-md-4">
                            <div className="card border-primary text-center">
                                <div className="card-body">
                                    <span className="h1 d-block text-primary fw-bold">12</span>
                                    <span className="label fw-bold">Happy Customers</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-primary text-center">
                                <div className="card-body">
                                    <span className="h1 d-block text-primary fw-bold">3</span>
                                    <span className="label fw-bold">Years of Experience</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-primary text-center">
                                <div className="card-body">
                                    <span className="h1 d-block text-primary fw-bold">87%</span>
                                    <span className="label fw-bold">Satisfaction</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="offers" className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5 text-primary fw-bold">Our Special functionalities</h2>
                    <div className="row">
                        <div className="col-md-4 d-flex">
                            <div className="card flex-fill text-center border-primary">
                                <div className="card-body">
                                    <h3 className="card-title">Matching gymrats with trainers</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex">
                            <div className="card flex-fill text-center border-primary">
                                <div className="card-body">
                                    <h3 className="card-title">Giving the posibility to our clients trainers and gymrats to customize their profiles</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex">
                            <div className="card flex-fill text-center border-primary">
                                <div className="card-body">
                                    <h3 className="card-title">Giving information about location, needs and availability of both users!</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Testimonials /> {/* Añade el componente Testimonials */}
            <FooterDesign/>
        </div>
    );
};
