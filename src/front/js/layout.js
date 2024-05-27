import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Availability } from "./pages/availability";
import { AddAvailability } from "./pages/addAvailability";
import { UpdateAvailability } from "./pages/updateAvailability";
import { SingleAvailability } from "./pages/singleAvailability";
import { Education } from "./pages/education";
import { AddEducation } from "./pages/addEducation";
import { UpdateEducation } from "./pages/updateEducation";
import { SingleEducation } from "./pages/singleEducation";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Availability />} path="/availability" />
                        <Route element={<SingleAvailability />} path="/availability/:availabilityID" />
                        <Route element={<AddAvailability />} path="/availability/add" />
                        <Route element={<UpdateAvailability />} path="/availability/update/:availabilityID" />
                        <Route element={<Education />} path="/education" />
                        <Route element={<SingleEducation />} path="/education/:educationID" />
                        <Route element={<AddEducation />} path="/education/add" />
                        <Route element={<UpdateEducation />} path="/education/update/:educationID" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
