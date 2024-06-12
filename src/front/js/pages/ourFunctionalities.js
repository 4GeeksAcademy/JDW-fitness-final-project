import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/landing.css";
import { NavbarLanding } from "../component/navbarLanding";
import { Testimonials } from "../component/testimonials";
import { FooterDesign } from "../component/footerNew";
import headerimg from "/workspaces/JDW-fitness-final-project/src/front/img/headerimg.webp";

export const OurFunctionalities = () => {
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
            </header>
            <section id="services" className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5 text-dark fw-bold">What You could do in JDW Fitness as a coach?</h2>
                    <div className="row">
                        <div className="col-md-4 d-flex">
                            <div className="card flex-fill text-center border-primary">
                                <div className="card-body">
                                    <h5 className="card-title">Contact with personal trainers</h5>
                                    <p className="card-text" >You can find personal trainers in your city and match with them to get the best training plans</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex">
                            <div className="card flex-fill text-center border-primary">
                                <div className="card-body">
                                    <h5 className="card-title">Are u a personal trainer?</h5>
                                    <p className="card-text">Look for clients and people who want to be trained here to get experience for your CV</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex">
                            <div className="card flex-fill text-center border-primary">
                                <div className="card-body">
                                    <h5 className="card-title">Customize your gymrat profile!</h5>
                                    <p className="card-text">Customizing your profile going to help you to get personal trainers easier!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="services" className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5 text-dark fw-bold">What You could do in JDW Fitness as a client?</h2>
                    <div className="row">
                        <div className="col-md-4 d-flex">
                            <div className="card flex-fill text-center border-primary">
                                <div className="card-body">
                                    <h5 className="card-title">Contact with personal trainers</h5>
                                    <p className="card-text" >You can find personal trainers in your city and match with them to get the best training plans</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex">
                            <div className="card flex-fill text-center border-primary">
                                <div className="card-body">
                                    <h5 className="card-title">Are u a personal trainer?</h5>
                                    <p className="card-text">Look for clients and people who want to be trained here to get experience for your CV</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex">
                            <div className="card flex-fill text-center border-primary">
                                <div className="card-body">
                                    <h5 className="card-title">Customize your gymrat profile!</h5>
                                    <p className="card-text">Customizing your profile going to help you to get personal trainers easier!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="why-choose-us" className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5 text-dark fw-bold">Our special functionalities</h2>
                    <p className="text-center text-dark fw-bold">Because we are the best service that gives you the posibility to match with trainers or clients with your same needs</p>
                    <div className="row text-center">
                        <div className="col-md-4">
                            <div className="card border-primary text-center">
                                <div className="card-body">
                                    <span className="h1 d-block text-primary fw-bold">Sample image</span>
                                    <span className="label fw-semibold">Dashboard consulting</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-primary text-center">
                                <div className="card-body">
                                    <span className="h1 d-block text-primary fw-bold">Sample image</span>
                                    <span className="label fw-semibold">IMC Calculator</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-primary text-center">
                                <div className="card-body">
                                    <span className="h1 d-block text-primary fw-bold">Sample image</span>
                                    <span className="label fw-semibold">Sending, receiving and matching </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="offers" className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5 text-dark fw-bold">Other functionalities</h2>
                    <div className="row">
                        <div className="col-md-4 d-flex">
                            <div className="card flex-fill text-center border-primary">
                                <div className="card-body">
                                    <h5 className="card-title">Matching gymrats with trainers</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex">
                            <div className="card flex-fill text-center border-primary">
                                <div className="card-body">
                                    <h5 className="card-title">Giving the posibility to our clients trainers and gymrats to customize their profiles</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex">
                            <div className="card flex-fill text-center border-primary">
                                <div className="card-body">
                                    <h5 className="card-title">Giving information about location, needs and availability of both users!</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FooterDesign/>
        </div>
    );
};
