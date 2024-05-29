import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const UpdateCoach = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [selectedEducation, setSelectedEducation] = useState("Education");
    const [educationID, setEducationID] = useState(0)
    const [selectedExperience, setSelectedExperience] = useState("Experience");
    const [experienceID, setExperienceID] = useState(0)
    const [showPassword, setShowPassword] = useState(false)
    const { coachID } = useParams();

    useEffect(() => {
        if (store.singleCoach && !username && !email && !password) {
            setUsername(store.singleCoach.username || "");
            setEmail(store.singleCoach.email || "");
            setEmail(store.singleCoach.email || "");
        }
    }, [store.singleAvailability]);

    useEffect(() => {
        actions.getEducation()
        actions.getExperience()
        actions.getSingleCoach(coachID);
    },[])

    useEffect(() => {
        const educationsSelected = store.education.find((element) => element.rank === selectedEducation)
        if (educationsSelected) {
            setEducationID(educationsSelected.id);
        } else {
            setEducationID(0); 
        }
    },[selectedEducation])

    useEffect(() => {
        const experienceselected = store.experience.find((element) => element.time === selectedExperience)
        if (experienceselected) {
            setExperienceID(experienceselected.id);
        } else {
            setExperienceID(0); 
        }
    },[selectedExperience])
    
    const handleSelectEducation = (rank) => {
        setSelectedEducation(rank);
    };

    const handleSelectExperience = (time) => {
        setSelectedExperience(time);
    };


    function updateCoach(e) {
        e.preventDefault()
		actions.coachSignUp(username, email, password, firstName, lastName, educationID, experienceID)
        if(username !== "" && email !== "" && password !== "") {
            setUsername("")
            setEmail("")
            setPassword("")
            setFirstName("")
            setLastName("")
            navigate("/coach")
        }
    }

	return (
		<div className="container mt-3">
            <h3 className="text-center mb-2">Coach Sign up</h3>
            <form>
                <div className="row">
                <div className="mb-3 col-6 offset-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Username"
                    />
                </div>
                <div className="mb-3 col-6 offset-3">
                    <input 
                    type="email" 
                    className="form-control" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email"
                    />
                </div>
                <div className="mb-3 col-6 offset-3">
                    <input 
                    type={showPassword ? "text" : "password"}  
                    className="form-control" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password"
                    />
                    <button 
                    onClick={() => setShowPassword(!showPassword)} 
                    className={`btn fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`} 
                    type="button"
                    >
                    </button>
                </div>
                <div className="mb-3 col-3 offset-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    placeholder="First Name"
                    />
                </div>
                <div className="mb-3 col-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    placeholder="Last Name"
                    />
                </div>
                <div className="dropdown col-3 offset-3">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {selectedEducation}
                    </button>
                    <ul className="dropdown-menu">
                        {store.education.map((element, index) => (
                            <li key={index}>
                                <a className="dropdown-item" href="#" onClick={() => handleSelectEducation(element.rank)}>
                                    {element.rank}
                                </a>
                            </li>          
                        ))}
                    </ul>
                </div>
                <div className="dropdown col-3">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {selectedExperience}
                    </button>
                    <ul className="dropdown-menu">
                        {store.experience.map((element, index) => (
                            <li key={index}>
                                <a className="dropdown-item" href="#" onClick={() => handleSelectExperience(element.time)}>
                                    {element.time}
                                </a>
                            </li>          
                        ))}
                    </ul>
                </div>
                {store.errorCoach &&                 
                <div className="alert alert-danger mt-4 py-2 d-flex justify-content-center col-6 offset-3" role="alert">
                    {store.errorCoach}
                </div>
                }
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-warning fw-bold mt-2" onClick={updateCoach}>Save changes</button>
                    <Link to="/coach">
                        <button className="btn btn-primary ms-3 fw-bold mt-2" >Back to Coach list</button>
                    </Link>
                </div>
            </form>
		</div>
	);
};
