import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const AddClient = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [gender, setGender] = useState("");
    const [physicalHabits, setPhysicalHabits] = useState("");
    const [selectedActivityFrequency, setSelectedActivityFrequency] = useState("ActivityFrequency");
    const [activityFrequencyID, setActivityFrequencyID] = useState(0)
    const [showPassword, setShowPassword] = useState(false)
    
    useEffect(() => {
        actions.getActivityFrequency()
    },[])

    useEffect(() => {
        const activityFrequencySelected = store.activities.find((element) => element.mode === selectedActivityFrequency)
        if (activityFrequencySelected) {
            setActivityFrequencyID(activityFrequencySelected.id);
        } else {
            setActivityFrequencyID(0); 
        }
    },[selectedActivityFrequency])
    
    const handleSelectActivityFrequency = (mode) => {
        setSelectedActivityFrequency(mode);
    };

    function addClient(e) {
        e.preventDefault()
		actions.clientSignUp(username, email, password, firstName, lastName, age, height, weight, gender, physicalHabits, activityFrequencyID)
        if(username !== "" && email !== "" && password !== "") {
            setUsername("")
            setEmail("")
            setPassword("")
            setFirstName("")
            setLastName("")
            setAge("")
            setHeight("")
            setWeight("")
            setGender("")
            setPhysicalHabits("")
            navigate("/client")
        }
    }

	return (
		<div className="container mt-3">
            <h3 className="text-center mb-2">Client Sign up</h3>
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
                <div className="mb-3 col-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={age} 
                    onChange={(e) => setAge(e.target.value)} 
                    placeholder="Age"
                    />
                </div>
                <div className="mb-3 col-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={height} 
                    onChange={(e) => setHeight(e.target.value)} 
                    placeholder="Height"
                    />
                </div>
                <div className="mb-3 col-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={weight} 
                    onChange={(e) => setWeight(e.target.value)} 
                    placeholder="Weight"
                    />
                </div>
                <div className="mb-3 col-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)} 
                    placeholder="Gender"
                    />
                </div>
                <div className="mb-3 col-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={physicalHabits} 
                    onChange={(e) => setPhysicalHabits(e.target.value)} 
                    placeholder="Physical Habits"
                    />
                </div>
                <div className="dropdown col-3 offset-3">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {selectedActivityFrequency}
                    </button>
                    <ul className="dropdown-menu">
                        {store.activities.map((element, index) => (
                            <li key={index}>
                                <a className="dropdown-item" href="#" onClick={() => handleSelectActivityFrequency(element.mode)}>
                                    {element.mode}
                                </a>
                            </li>          
                        ))}
                    </ul>
                </div>
                {store.errorClient &&                 
                <div className="alert alert-danger mt-4 py-2 d-flex justify-content-center col-6 offset-3" role="alert">
                    {store.errorClient}
                </div>
                }
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-warning fw-bold mt-2" onClick={addClient}>Create Client</button>
                    <Link to="/client">
                        <button className="btn btn-primary ms-3 fw-bold mt-2" >Back to Client list</button>
                    </Link>
                </div>
            </form>
		</div>
	);
};