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
    const [activityFrequencyID, setActivityFrequencyID] = useState(0)
    const [showPassword, setShowPassword] = useState(false)
    
    useEffect(() => {
        actions.getActivityFrequency()
    },[])

    function addClient(e) {
        e.preventDefault()
		actions.clientSignUp(username, email, password, firstName, lastName, age, height, weight, gender, physicalHabits, activityFrequencyID)
        if(username !== "" && email !== "" && password !== "") {
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
                <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={(e) => setActivityFrequencyID(e.target.value)}>
                    <option defaultValue>Select your Activity Frequency</option>
                    {store.activities.map((element, index) => (
                            <option key={index} value={element.id}>
                                    {element.mode}
                            </option>          
                    ))}
                </select>
                {store.errorClient &&                 
                <div className="alert alert-danger mt-4 py-2 d-flex justify-content-center col-6 offset-3" role="alert">
                    {store.errorClient}
                </div>
                }
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-warning fw-bold mt-2" onClick={addClient}>Create Client</button>
                    <Link to="/signup">
                        <button className="btn btn-primary ms-3 fw-bold mt-2" >Back to Signup</button>
                    </Link>
                </div>
            </form>
		</div>
	);
};