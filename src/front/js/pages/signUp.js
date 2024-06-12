import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import sideBarLogo from "/workspaces/JDW-fitness-final-project/src/front/img/sidebar-logo.png"

import { Context } from "../store/appContext";

export const SignUp = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [selectedOption, setSelectedOption] = useState("");
    const [error, setError] = useState(null);
    const [errorState, setErrorState] = useState(false)


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
                navigate("/home")  
            }
            if (data.access_client_token) {
                await actions.getClients()
                const loggedClient = await store.clients.find(client => client.email === email);
                localStorage.setItem("loggedClient", JSON.stringify({ "id": loggedClient.id, "username": loggedClient.username }));
                await actions.setAuth("client", true)  
                localStorage.setItem("token_client", data.access_client_token); 
                navigate("/home")   
            } 
            return data
        }  
        catch (error) {
            console.error("Error during coach login:", error);
        }
    }

    const signUp = async (e) => {
        e.preventDefault();
        if (selectedOption === "client") {
            await actions.clientSignUp(username, email, password);
        } else if (selectedOption === "coach") {
            await actions.coachSignUp(username, email, password);
        } else {
            setErrorState(true)
            setError("Please select a role (Client or Coach)")
        }
        
        if(store.errorForm) {
            setErrorState(false)
            setError(store.errorForm)
        }
        if (!store.errorForm && !errorState) {
            login(email, password);
        }
    };

	return (
            <div className="authincation h-100 mt-5">
                    <div className="container h-100">
                        <div className="row justify-content-center h-100 align-items-center">
                            <div className="col-md-6">
                                <div className="authincation-content">
                                    <div className="row no-gutters">
                                        <div className="col-xl-12">
                                            <div className="p-5">
                                                <div className="text-center mb-4">
                                                <img src={sideBarLogo} alt="logo-with-name" className="logo-sidebar"/>
                                                </div>
                                                <h5 className="text-center mb-4">Sign up</h5>
                                                <form onSubmit={signUp}>
                                                <div className="form-group">
                                                        <label className="mb-1 form-label"> Username</label>
                                                        <input 
                                                        type="text" 
                                                        className="form-control p-3" 
                                                        placeholder="username" 
                                                        value={username} 
                                                        onChange={(e) => setUsername(e.target.value)} 
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="mb-1 form-label"> Email</label>
                                                        <input 
                                                        type="email" 
                                                        className="form-control p-3" 
                                                        placeholder="hello@example.com" 
                                                        value={email} 
                                                        onChange={(e) => setEmail(e.target.value)} 
                                                        />
                                                    </div>
                                                    <div className="mb-4 position-relative">
                                                        <label className="mb-1 form-label">Password</label>
                                                        <input 
                                                        type={showPassword ? "text" : "password"}
                                                        className="form-control p-3" 
                                                        placeholder="******"
                                                        value={password} 
                                                        onChange={(e) => setPassword(e.target.value)} 
                                                        />
                                                        <span className="show-pass eye" type="button" onClick={() => setShowPassword(!showPassword)} >
                                                        {showPassword ? 
                                                            <i className="fa fa-eye"></i>
                                                            :
                                                            <i className="fa fa-eye-slash"></i>
                                                            }
                                                        </span>
                                                    </div>
                                        <div className="mb-4 position-relative">
                                        <label className="mb-3 form-label">Choose your role</label>
                                        <div className="card-body">
                                            <div className="basic-form">
                                                <div className="form-group mb-0">
                                                    <div className="form-check d-inline-block me-2">
                                                        <input 
                                                        className="form-check-input" 
                                                        type="radio" 
                                                        name="role" 
                                                        id="client"
                                                        value="client" 
                                                        checked={selectedOption === "client"} 
                                                        onChange={(e) => setSelectedOption(e.target.value)}
                                                        />
                                                        <label className="form-check-label" htmlFor="client">
                                                            Client
                                                        </label>
                                                    </div>
                                                    <div className="form-check d-inline-block mx-2">
                                                        <input 
                                                        className="form-check-input" 
                                                        type="radio" 
                                                        name="role" 
                                                        id="coach"
                                                        value="coach" 
                                                        checked={selectedOption === "coach"} 
                                                        onChange={(e) => setSelectedOption(e.target.value)}
                                                        />
                                                        <label className="form-check-label" htmlFor="coach">
                                                            Coach
                                                        </label>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                                    {error &&                
                                                    <div className="alert alert-danger alert-dismissible fade show text-center fw-semibold mb-4" role="alert">
                                                        {error}
                                                    </div>
                                                    }
                                                    <div className="text-center">
                                                        <button type="submit" className="btn btn-secondary light btn-block fw-bolder p-3 w-100">Sign me up</button>
                                                    </div>
                                                </form>
                                        <div className="new-account mt-4">
                                        <p>Already have an account?
                                        <Link to="/login" className="text-secondary text-decoration-none ms-2">
                                            Login
                                        </Link>
                                        </p>
                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
	);
};
   