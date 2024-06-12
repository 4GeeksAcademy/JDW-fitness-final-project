import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import sideBarLogo from "/workspaces/JDW-fitness-final-project/src/front/img/sidebar-logo.png"

import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(null)

    const login = async (e) => {
        e.preventDefault()
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
            
            if (!response.ok) {
                console.log("Error from backend:", data.error);
                setError(data.error);
                return
            }
            setError(null);
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
            setError("An error occurred during login. Please try again.");
            console.error("Error during coach login:", error);
        }
    }

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
                                    <h5 className="text-center mb-4">Login to your account</h5>
                                    <form onSubmit={login}>
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
                                        {/* <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                            <div className="form-group">
                                                <a href="page-forgot-password.html">Forgot Password?</a>
                                            </div>
                                        </div> */}
                                        {error &&                 
                                        <div className="alert alert-danger alert-dismissible fade show text-center fw-semibold mb-4" role="alert">
                                            {error}
                                        </div>
                                        }
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-secondary light btn-block fw-bolder p-3 w-100">Login</button>
                                        </div>
                                    </form>
                                    <div className="new-account mt-4">
                                        <p>Don't have an account?
                                        <Link to="/signup" className="text-secondary text-decoration-none ms-2">
                                            Sign up
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
    