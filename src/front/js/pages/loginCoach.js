import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const LoginCoach = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    function login(e) {
        e.preventDefault()
		actions.coachLogin(email.trim(), password.trim())
    }

	return (
		<div className="container mt-3">
            <h3 className="text-center">Login Coach</h3>
            <form>
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
                {store.errorCoach &&                 
                <div className="alert alert-danger mt-4 py-2 d-flex justify-content-center col-6 offset-3" role="alert">
                    {store.errorCoach}
                </div>
                }
                <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-warning fw-bold" onClick={login}>Login</button>
                <Link to="/">
				    <button className="btn btn-primary ms-3 fw-bold" >Back Home</button>
			    </Link>
                </div>
            </form>
		</div>
	);
};
