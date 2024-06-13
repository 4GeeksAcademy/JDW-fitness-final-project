import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/landing.css";
import { NavbarLanding } from "../component/navbarLanding";
import { Testimonials } from "../component/testimonials";
import { FooterDesign } from "../component/footerNew";
import headerimg from "/workspaces/JDW-fitness-final-project/src/front/img/headerimg.webp";
import sampleimg from "/workspaces/JDW-fitness-final-project/src/front/img/dashobard.png"
import calculator from "/workspaces/JDW-fitness-final-project/src/front/img/calculator.png"
import clientlist from "/workspaces/JDW-fitness-final-project/src/front/img/client_list.png"
import coachlist from "/workspaces/JDW-fitness-final-project/src/front/img/coach_list.png"
import matchlist from "/workspaces/JDW-fitness-final-project/src/front/img/match_list.png"
import profile from "/workspaces/JDW-fitness-final-project/src/front/img/location.png"

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
            <section id="functionalities" className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5 text-dark fw-bold">Our special functionalities</h2>
                    <p className="text-center text-dark fw-bold">Because we are the best service that gives you the posibility to match with trainers or clients with your same needs</p>
                    <div className="row text-center justify-content-center">
                    <div className="col-md-10 ">
                    <div className="card flex-fill text-center border-primary">
                                <div className="card-body">
                                    <h4 className="card-title fw-semibold">Contact with users who are ready to train with you</h4>
                                    <img src={matchlist} alt="Card image" className="img-fluid rounded mt-3 mb-3 w-100" style={{ maxWidth: '100%', height: 'auto' }}/>
                                    <p className="card-text fw-semibold" >You can find users who you request to train and both part accepted the conditions to train together and send them a message!</p>                                </div>
                            </div>
                    </div>
                    <div className="col-md-10 ">
                    <div className="card flex-fill text-center border-primary">
                                <div className="card-body">
                                    <h4 className="card-title fw-semibold">As a client use our fitness calculator</h4>
                                    <img src={calculator} alt="Card image" className="img-fluid rounded mt-3 mb-3 w-100" style={{ maxWidth: '100%', height: 'auto' }}/>
                                    <p className="card-text fw-semibold" >You can calculate your BMI and other important things to know for your training!</p>                                </div>
                            </div>
                    </div>
                    <div className="col-md-10 ">
                    <div className="card flex-fill text-center border-primary">
                                <div className="card-body">
                                    <h4 className="card-title fw-semibold">Edit your personal profile</h4>
                                    <img src={profile} alt="Card image" className="img-fluid rounded mt-3 mb-3 w-100" style={{ maxWidth: '100%', height: 'auto' }}/>
                                    <p className="card-text fw-semibold" >You can edit your personal profile as a trainer or as a client and you can upload your own profile image and your favorite location to train!</p>                                </div>
                            </div>
                    </div>
                    <div className="col-md-10 ">
                    <div className="card flex-fill text-center border-primary">
                                <div className="card-body">
                                    <h4 className="card-title fw-semibold">See all data in your dashboard</h4>
                                    <img src={sampleimg} alt="Card image" className="img-fluid rounded mt-3 mb-3 w-100" style={{ maxWidth: '100%', height: 'auto' }}/>
                                    <p className="card-text fw-semibold" >You can see how many coaches are active and other features in our personal dashboard to know all about!</p>                                </div>
                            </div>
                    </div>  
                    </div>
                </div>
            </section>
            <FooterDesign/>
        </div>
    );
};
