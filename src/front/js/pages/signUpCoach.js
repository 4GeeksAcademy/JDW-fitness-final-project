import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const SignUpCoach = () => {
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

    useEffect(() => {
        actions.getEducation()
        actions.getExperience()
    },[])

    const login = async (email, password) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                "email": email,
                "password": password 
            })
        };
    
        try {
            const response = await fetch(process.env.BACKEND_URL + "/api/login", requestOptions);
            const data = await response.json();
            
            if (data.access_coach_token) {
                await actions.getCoaches()
                const loggedCoach = await store.coaches.find(coach => coach.email === email);
                localStorage.setItem("loggedCoach", JSON.stringify({ "id": loggedCoach.id, "username": loggedCoach.username }));
                await actions.setAuth("coach", true)  
                localStorage.setItem("token_coach", data.access_coach_token);
                navigate("/client")  
            }
            return data
        }  
        catch (error) {
            console.error("Error during coach login:", error);
        }
    }

    const signUp = async (e) => {
        e.preventDefault();
        await actions.coachSignUp(username, email, password, firstName, lastName, educationID, experienceID);
        const error = await store.errorForm
        if (!error) {
            login(email, password)
        }
    };

	return (
		<div className="container mt-3">
            <h3 className="text-center mb-2">Sign up</h3>
            <form onSubmit={signUp}>
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
                {store.errorForm &&                 
                <div className="alert alert-danger mt-4 py-2 d-flex justify-content-center col-6 offset-3" role="alert">
                    {store.errorForm}
                </div>
                }
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-warning fw-bold mt-2" >Create your profile</button>
                    <Link to="/">
                        <button className="btn btn-primary ms-3 fw-bold mt-2" >Back Home</button>
                    </Link>
                </div>
            </form>
		</div>
	);
};
