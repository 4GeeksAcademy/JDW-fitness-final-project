import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const AddCoach = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [educationID, setEducationID] = useState(0)
    const [experienceID, setExperienceID] = useState(0)
    const [showPassword, setShowPassword] = useState(false)
    const [handleButton, setHandleButton] = useState(false)
    
    useEffect(() => {
        actions.getEducation()
        actions.getExperience()
    },[])

    useEffect(() => {
        if (!store.errorCoach && handleButton) {
            navigate("/coach");
        }
    },[store.errorCoach])

    function addCoach(e) {
        e.preventDefault();
        actions.coachSignUp(username, email, password, firstName, lastName, educationID, experienceID);
        setHandleButton(true)
    };

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
                <select className="form-select form-select-lg mb-3 w-50 offset-3" aria-label=".form-select-lg example" onChange={(e) => setEducationID(e.target.value)}>
                    <option defaultValue>Select your education</option>
                    {store.education.map((element, index) => (
                            <option key={index} value={element.id}>
                                    {element.rank}
                            </option>          
                    ))}
                </select>
                <select className="form-select form-select-lg mb-3 w-50 offset-3" aria-label=".form-select-lg example" onChange={(e) => setExperienceID(e.target.value)}>
                    <option defaultValue>Select your experience</option>
                    {store.experience.map((element, index) => (
                            <option key={index} value={element.id}>
                                    {element.time}
                            </option>          
                    ))}
                </select>
                {store.errorCoach &&                 
                <div className="alert alert-danger mt-4 py-2 d-flex justify-content-center col-6 offset-3" role="alert">
                    {store.errorCoach}
                </div>
                }
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-warning fw-bold mt-2" onClick={addCoach}>Create Coach</button>
                    <Link to="/coach">
                        <button className="btn btn-primary ms-3 fw-bold mt-2" >Back to Coach list</button>
                    </Link>
                </div>
            </form>
		</div>
	);
};
