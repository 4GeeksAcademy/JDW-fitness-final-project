import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const UpdateCoachSignUp = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [educationID, setEducationID] = useState(0)
    const [experienceID, setExperienceID] = useState(0)
    const { coachID } = useParams();

    useEffect(() => {
        actions.getEducation()
        actions.getExperience()
        actions.getSingleCoach(coachID);
    },[])

    function updateCoach(e) {
        e.preventDefault();
        actions.updateCoachAPI(store.singleCoach.username, store.singleCoach.email, store.singleCoach.password, firstName, lastName, educationID, experienceID, coachID)
        navigate(`/`);
    };

	return (
		<div className="container mt-3">
            <h3 className="text-center mb-2">Now complete your profile to be a complete Jidower! <i class="fa-solid fa-hand-point-left"></i></h3>
            <form>
                <div className="row">
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
                <select value={educationID} className="form-select form-select-lg mb-3 w-50 offset-3" aria-label=".form-select-lg example" onChange={(e) => setEducationID(e.target.value)}>
                    {educationID == 0 && <option defaultValue>Select your education</option>}
                    {store.education.map((element, index) => (
                            <option key={index} value={element.id}>
                                    {element.rank}
                            </option>          
                    ))}
                </select>
                <select value={experienceID} className="form-select form-select-lg mb-3 w-50 offset-3" aria-label=".form-select-lg example" onChange={(e) => setExperienceID(e.target.value)}>
                    {experienceID == 0 && <option defaultValue>Select your experience</option>}  
                    {store.experience.map((element, index) => (
                            <option key={index} value={element.id}>
                                    {element.time}
                            </option>          
                    ))}
                </select>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-warning fw-bold mt-2" onClick={updateCoach}>Finish your profile</button>
                </div>
            </form>
		</div>
	);
};
