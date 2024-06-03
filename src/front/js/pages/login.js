import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        actions.getCoaches()
        actions.getClients()
    },[]);

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
                const loggedCoach = await store.coaches.find(coach => coach.email === email);
                localStorage.setItem("loggedCoach", loggedCoach.username);
                await actions.setAuth("coach", true)  
                localStorage.setItem("token_coach", data.access_coach_token);
                navigate("/client")  
            }
            if (data.access_client_token) {
                const loggedClient = await store.clients.find(client => client.email === email);
                localStorage.setItem("loggedClient", loggedClient.username); 
                await actions.setAuth("client", true)  
                localStorage.setItem("token_client", data.access_client_token); 
                navigate("/coach")   
            }
            return data
        }  
        catch (error) {
            setError("An error occurred during login. Please try again.");
            console.error("Error during coach login:", error);
        }
    }

	return (
		<div className="container mt-3">
            <h3 className="text-center">Login</h3>
            <form onSubmit={login}>
                <div className="mb-3 mt-3 col-6 offset-3">
                    <input 
                    type="text" 
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
                {error &&                 
                <div className="alert alert-danger mt-4 py-2 d-flex justify-content-center col-6 offset-3" role="alert">
                    {error}
                </div>
                }
                <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-warning fw-bold" >Login</button>
                {/* Tengo que pulsar el botón de Login dos veces para que se haga correctamente y obtener el token. Pendiente de arreglar este error. */}
                <Link to="/">
				    <button className="btn btn-primary ms-3 fw-bold" >Back Home</button>
			    </Link>
                </div>
            </form>
		</div>
	);
};
