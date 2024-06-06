import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const SignUpClient = () => {
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
            
            if (data.access_client_token) {
                await actions.getClients()
                const loggedClient = await store.clients.find(client => client.email === email);
                console.log(loggedClient);
                localStorage.setItem("loggedClient", JSON.stringify({ "id": loggedClient.id, "username": loggedClient.username }));
                await actions.setAuth("client", true)  
                localStorage.setItem("token_client", data.access_client_token);
                navigate("/coach")  
            }
            return data
        }  
        catch (error) {
            console.error("Error during client login:", error);
        }
    }
//añadir clientSignup en flux
    const signUp = async (e) => {
        e.preventDefault();
        await actions.clientSignUp(username, email, password, firstName, lastName, age, height, weight, gender, physicalHabits, activityFrequencyID);
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
                <select value={activityFrequencyID} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={(e) => setActivityFrequencyID(e.target.value)}>
                    {activityFrequencyID == 0 && 
                    <option defaultValue>Select your activity frequency</option>}  
                    {store.activities.map((element, index) => (
                            <option key={index} value={element.id}>
                                    {element.mode}
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