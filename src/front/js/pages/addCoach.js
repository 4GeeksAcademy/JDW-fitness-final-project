import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const AddCoach = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    // useEffect(() => {
    //     if (!store.errorCoach) {
    //         const currentCoach = store.coaches.find ((coach) => coach.username === username)
    //         // if(currentCoach) console.log(currentCoach);
            
    //         navigate(`/coach/signup/update/${currentCoach.id}`);
    //     }
    // },[store.errorCoach, store.coaches])

    // function addCoach(e) {
    //     e.preventDefault();
    //     actions.coachSignUp(username, email, password);
    //     setHandleButton(true)
    // };

    const addCoach = async (e) => {
        e.preventDefault()
        if(!tokenCoach || email === "" || password === "") {
            console.log("error despues de login");
        }
        try {
            await actions.coachSignUp(username, email, password);
            const currentCoach = store.coaches.find ((coach) => coach.username === username)
            navigate(`/coach/signup/update/${currentCoach.id}`);
            navigate("/client")
        }
        catch (error) {
            console.log("error fatal", error);
        }
    }

	return (
		<div className="container mt-3">
            <h3 className="text-center mb-2">Coach Sign up</h3>
            <form onSubmit={addCoach}>
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
                {store.errorCoach &&                 
                <div className="alert alert-danger mt-4 py-2 d-flex justify-content-center col-6 offset-3" role="alert">
                    {store.errorCoach}
                </div>
                }
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-warning fw-bold mt-2" >Create Coach</button>
                    <Link to="/signup">
                        <button className="btn btn-primary ms-3 fw-bold mt-2" >Back to Signup</button>
                    </Link>
                </div>
            </form>
		</div>
	);
};
