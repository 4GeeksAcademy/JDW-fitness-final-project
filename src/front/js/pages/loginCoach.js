import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const LoginCoach = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(null)
    const tokenCoach = localStorage.getItem("token_coach")

    // useEffect(() => { 
         
    // },[tokenCoach])

    const login = async (e) => {
        e.preventDefault()
        if(email === "" || password === "") {
            console.log("faltan completar");
            return;
        }
        try {
            await actions.coachLogin(email, password)
            navigate("/client")
        }
        catch (error) {
            console.log("error fatal", error);
        }
    }

	return (
		<div className="container mt-3">
            <h3 className="text-center">Login Coach</h3>
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
                {store.errorForm &&                 
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
