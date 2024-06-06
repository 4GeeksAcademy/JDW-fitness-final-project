import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { SignUp } from "./pages/signUp";
import { Login } from "./pages/login";

import { Availability } from "./pages/availability";
import { AddAvailability } from "./pages/addAvailability";
import { UpdateAvailability } from "./pages/updateAvailability";
import { SingleAvailability } from "./pages/singleAvailability";

import { Goals } from "./pages/goals";
import { AddGoal } from "./pages/addGoal";
import { UpdateGoal } from "./pages/updateGoal";
import { SingleGoal } from "./pages/singleGoal";

import { Diseases } from "./pages/diseases";
import { AddDiseases } from "./pages/addDiseases";
import { UpdateDisease } from "./pages/updateDiseases";
import { SingleDiseases } from "./pages/singleDiseases";

import { Experience } from "./pages/experience";
import { AddExperience } from "./pages/addExperience";
import { UpdateExperience } from "./pages/updateExperience";
import { SingleExperience } from "./pages/singleExperience";

import { Education } from "./pages/education";
import { AddEducation } from "./pages/addEducation";
import { UpdateEducation } from "./pages/updateEducation";
import { SingleEducation } from "./pages/singleEducation";

import { ActivityFrequency } from "./pages/activityFrequency";
import { AddActivity } from "./pages/addActivity";
import { UpdateActivity } from "./pages/updateActivity";
import { SingleActivity } from "./pages/singleActivity";

import { Client } from "./pages/client";
import { SignUpClient } from "./pages/signupClient";
import { SingleClient } from "./pages/singleClient";
import { AddClient } from "./pages/addClient";
import { UpdateClient } from "./pages/updateClient";

import { Coach } from "./pages/coach";
import { SignUpCoach } from "./pages/signUpCoach";
import { SingleCoach } from "./pages/singleCoach";
import { AddCoach } from "./pages/addCoach";
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

import injectContext from "./store/appContext";
// import { AvailabilityClient } from "./pages/availabilityClient";

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
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<SignUpClient />} path="/client/signup" />
                        <Route element={<SignUpCoach />} path="/coach/signup" />
                        <Route element={<Login />} path="/login" />
                        {/* AVAILABILITY ROUTES */}  
                        <Route element={<Availability />} path="/availability" />
                        <Route element={<SingleAvailability />} path="/availability/:availabilityID" />
                        <Route element={<AddAvailability />} path="/availability/add" />
                        <Route element={<UpdateAvailability />} path="/availability/update/:availabilityID" />  
                        {/* GOALS ROUTES */}
                        <Route element={<Goals />} path="/goals" />
                        <Route element={<SingleGoal />} path="/goals/:goalID" />
                        <Route element={<AddGoal />} path="/goals/form" />
                        <Route element={<UpdateGoal />} path="/goals/update/:goalID" />
                        {/* AVAILABILITY_CLIENT ROUTES */}
                        {/* <Route element={<AvailabilityClient />} path="/availability-client" /> */}
                        {/* DISEASES ROUTES */}
                        <Route element={<Diseases />} path="/diseases" />
                        <Route element={<SingleDiseases />}  path="/diseases/:diseasesID" />
                        <Route element={<AddDiseases />} path="/diseases/add" />    
                        <Route element={<UpdateDisease />} path="/diseases/update/:diseaseID" />   
                        {/* EXPERIENCE ROUTES */}
                        <Route element={<Experience />} path="/experience" />
                        <Route element={<SingleExperience />} path="/experience/:experienceID" />
                        <Route element={<AddExperience />} path="/experience/add" />
                        <Route element={<UpdateExperience />} path="/experience/update/:experienceID" />  
                        {/* EDUCATION ROUTES */}
                        <Route element={<Education />} path="/education" />
                        <Route element={<SingleEducation />} path="/education/:educationID" />
                        <Route element={<AddEducation />} path="/education/add" />
                        <Route element={<UpdateEducation />} path="/education/update/:educationID" />
                        {/* ACTIVITY PATH */}
                        <Route element={<ActivityFrequency />} path="/activities" />
                        <Route element={<AddActivity />} path="/activities/form" />
                        <Route element={<UpdateActivity />} path="/activities/update/:activityID" />
                        <Route element={<SingleActivity />} path="/activities/:activityID" />
                        {/* COACH PATH */}
                        <Route element={<Coach />} path="/coach" />
                        <Route element={<SingleCoach />} path="/coach/:coachID" />
                        <Route element={<AddCoach />} path="/coach/signup" />
                        <Route element={<UpdateCoach />} path="/coach/update/:coachID" />
                        {/* CLIENT PATH */}
                        <Route element={<Client />} path="/client" />
                        <Route element={<SingleClient />} path="/client/:clientID" />
                        <Route element={<AddClient />} path="/client/signup" />
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
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
