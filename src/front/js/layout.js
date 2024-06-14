import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { LandingPage } from "./pages/landingPage";
import { AboutUs } from "./pages/aboutUs";
import { Dashboard } from "./pages/dashboard";
import { SignUp } from "./pages/signUp";
import { Login } from "./pages/login";
import { WhyChooseUs } from "./pages/whyChooseUs";
import { OurFunctionalities } from "./pages/ourFunctionalities";

import { Client } from "./pages/client";
import { SingleClient } from "./pages/singleClient";
import { UpdateClient } from "./pages/updateClient";

import { Coach } from "./pages/coach";
import { SingleCoach } from "./pages/singleCoach";
import { UpdateCoach } from "./pages/updateCoach";

import { Likes } from "./pages/likes";
import { GivenLikesClient } from "./pages/givenLikesClient";
import { ReceivedLikesClient } from "./pages/receivedLikesClient";
import { NoGivenLikesClient } from "./pages/noGivenLikes";
import { MatchClient } from "./pages/matchClient";
import { GivenLikesCoach } from "./pages/givenLikesCoach";
import { NoGivenLikesCoach } from "./pages/noGivenLikesCoach";
import { ReceivedLikesCoach } from "./pages/receivedLikesCoach";
import { MatchCoach } from "./pages/matchCoach";

import { CalculatorClient } from "./pages/calculatorClient";
import { CalculatorCoach } from "./pages/calculatorCoach";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import { useContext } from "react";
import { Context } from "./store/appContext";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    const { store, actions } = useContext(Context);

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;
    const isLogedUser = !!localStorage.getItem("token_client") || !!localStorage.getItem("token_coach");
    const isNotLogedUser = !isLogedUser;

    return (
        <div className="app-wrapper">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    {isLogedUser && <Navbar />} 
                    <div className={`main-wrapper ${isLogedUser && `${store.sidebarOpen && isLogedUser ? 'sidebar-open' : 'sidebar-close'}`}`}>
                    <Routes>
                        {/* LANDING PAGE ROUTES AS A NOT LOGUED USER */}
                        {isNotLogedUser && <Route path="/" element={<LandingPage />} />}
                        <Route element={<AboutUs />} path="/about" />
                        <Route element={<WhyChooseUs />} path="/why-choose-us" />
                        <Route element={<OurFunctionalities />} path="/functionalities" />
                        <Route element={<Dashboard />} path="/home" />
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<CalculatorClient />} path="/client/calculator" />
                        <Route element={<CalculatorCoach />} path="/coach/calculator" />
                        {/* COACH PATH */}
                        <Route element={<Coach />} path="/coach" />
                        <Route element={<SingleCoach />} path="/coach/:coachID" />
                        <Route element={<UpdateCoach />} path="/coach/update/:coachID" />
                        {/* CLIENT PATH */}
                        <Route element={<Client />} path="/client" />
                        <Route element={<SingleClient />} path="/client/:clientID" />
                        <Route element={<UpdateClient />} path="/client/update/:clientID" />
                        {/* LIKES AND MATCH PATH */}
                        <Route element={<Likes />} path="/likes" />
                        <Route element={<GivenLikesClient />} path="client/likes/given" />  
                        <Route element={<NoGivenLikesClient />} path="client/likes/nogiven" />
                        <Route element={<ReceivedLikesClient />} path="client/likes/received" />
                        <Route element={<MatchClient />} path="/client/match" />
                        <Route element={<GivenLikesCoach />} path="/coach/likes/given" /> 
                        <Route element={<NoGivenLikesCoach />} path="/coach/likes/nogiven" /> 
                        <Route element={<ReceivedLikesCoach />} path="/coach/likes/received" /> 
                        <Route element={<MatchCoach />} path="/coach/match" />
                        {/* NOT FOUND */}
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    </div>
                    {isLogedUser && <Footer />} 
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
