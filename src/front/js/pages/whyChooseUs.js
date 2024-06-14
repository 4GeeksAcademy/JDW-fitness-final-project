import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/whychooseus.css";
import { NavbarLanding } from "../component/navbarLanding";
import { Testimonials } from "../component/testimonials";
import { FooterDesign } from "../component/footerNew";
import headerimg from "../../img/headerimg.webp";
import sampleimg from "../../img/sample.png"

export const WhyChooseUs = () => {
    const { store, actions } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        if (location.pathname !== path) {
            navigate(path);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="why-choose-us"style={{ marginBottom: '4rem' }}>
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
                <div className="container-fluid">
                    <h2 className="text-center mb-5 text-dark fw-bold">Why should you choose JDW Fitness as your fitness social network?</h2>
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-10 col-xl-6">
                            <div className="card flex-fill text-center border-primary">
                                <div className="card-body">
                                    <h4 className="card-title fw-semibold">Contact with personal trainers</h4>
                                    <img src={sampleimg} alt="Card image" className="img-fluid rounded mt-3 mb-3 w-100" style={{ maxWidth: '100%', height: 'auto' }}/>
                                    <p className="card-text fw-semibold" >You can find personal trainers in your city and match with them to get the best training plans. Do you want to know more about this functionality?</p>
                                    <button className="btn btn-primary view-button fw-bold" onClick={() => handleNavigation('/functionalities')}>Go to full preview!</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-10 col-xl-6">
                            <div className="card flex-fill text-center border-primary">
                                <div className="card-body">
                                    <h4 className="card-title fw-semibold">Contact with clients</h4>
                                    <img src={sampleimg} alt="Card image" className="img-fluid rounded mt-3 mb-3 w-100" style={{ maxWidth: '100%', height: 'auto' }}/>
                                    <p className="card-text fw-semibold" >You can find clients in your city and match with them to get clients to train. Do you want to know more about this functionality?</p>
                                    <button className="btn btn-primary view-button fw-bold" onClick={() => handleNavigation('/functionalities')}>Go to full preview!</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-10 col-xl-6">
                            <div className="card flex-fill text-center border-primary">
                                <div className="card-body">
                                    <h4 className="card-title fw-semibold">Are you looking for clients to train?</h4>
                                    <img src={sampleimg} alt="Card image" className="img-fluid rounded mt-3 mb-3 w-100" style={{ maxWidth: '100%', height: 'auto' }}/>
                                    <p className="card-text fw-semibold" >Look for clients and people who want to be trained here to get experience as a personal trainer. You could do it easier with our functionalities!</p>
                                    <button className="btn btn-primary view-button fw-bold" onClick={() => handleNavigation('/functionalities')}>Go to full preview!</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-10 col-xl-6">
                            <div className="card flex-fill text-center border-primary">
                                <div className="card-body">
                                    <h4 className="card-title fw-semibold">Are you looking for a personal trainer?</h4>
                                    <img src={sampleimg} alt="Card image" className="img-fluid rounded mt-3 mb-3 w-100" style={{ maxWidth: '100%', height: 'auto' }}/>
                                    <p className="card-text fw-semibold" >Customize your profile and search for personal trainers. Choose the ones that best match the trainer profile you're looking for with our features!</p>
                                    <button className="btn btn-primary view-button fw-bold" onClick={() => handleNavigation('/functionalities')}>Go to full preview!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="why-choose-us" className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5 text-dark fw-bold">Why Choose Us</h2>
                    <p className="text-center text-dark fw-bold">Because we are the best service that gives you the posibility to match with trainers or clients with your same needs</p>
                    <div className="row text-center">
                        <div className="col-md-4">
                            <div className="card border-primary text-center">
                                <div className="card-body">
                                    <span className="h1 d-block text-primary fw-bold">12</span>
                                    <span className="label fw-semibold">Happy users</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-primary text-center">
                                <div className="card-body">
                                    <span className="h1 d-block text-primary fw-bold">18</span>
                                    <span className="label fw-semibold">Weeks of Experience</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-primary text-center">
                                <div className="card-body">
                                    <span className="h1 d-block text-primary fw-bold">87%</span>
                                    <span className="label fw-semibold">Satisfaction</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Testimonials className="mb-5" /> {/* Añade el componente Testimonials */}
            <FooterDesign/>
        </div>
    );
};
