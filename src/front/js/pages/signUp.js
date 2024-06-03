import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const SignUp = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
	const [selectedRole, setSelectedRole] = useState("")
	const [errorRole, setErrorRole] = useState("")

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

    // const signUp = async (e) => {
    //     e.preventDefault()
    //     if(!tokenCoach || email === "" || password === "") {
    //         console.log("error despues de login");
    //     }
    //     try {
    //         await actions.coachSignUp(username, email, password);
    //         const currentCoach = store.coaches.find ((coach) => coach.username === username)
    //         navigate(`/coach/signup/update/${currentCoach.id}`);
    //         navigate("/client")
    //     }
    //     catch (error) {
    //         console.log("error fatal", error);
    //     }
    // }

	// useEffect(() => {
    //     if (!store.errorForm && selectedRole === "coach") {
    //         const currentCoach = store.coaches.find((coach) => coach.username === username);
    //         if (currentCoach) {
    //             navigate(`/coach/signup/${currentCoach.id}`);
    //         }
    //     } else if (store.errorForm === undefined && selectedRole === "client") {
	// 		const currentClient = store.clients.find((client) => client.username === username);
    //         if (currentClient) {
    //             navigate(`/client/signup/${currentClient.id}`);
    //         }
    //     }
    // }, [store.errorForm, store.coaches,store.clients, selectedRole, username, actions]);

	const signUp = async (e) => {
        e.preventDefault();
        if (!selectedRole) {
            setErrorRole("Please select a role")
            return;
        } else setErrorRole("")
        try {
            if (selectedRole === "coach") {
                await actions.coachSignUp(username, email, password);
				const currentCoach = store.coaches.find((coach) => coach.username === username);
				navigate(`/coach/login`);
            } else if (selectedRole === "client") {
                await actions.clientSignUp(username, email, password);
            }
        } catch (error) {
            console.log("error fatal", error);
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
				<div className="d-flex justify-content-center my-3">
				<div className="form-check me-3">
					<input 
					className="form-check-input" 
					type="radio" 
					name="role" 
					id="client" 
					value="client" 
					onChange={(e) => setSelectedRole(e.target.value)}
					/>
					<label className="form-check-label" htmlFor="client">
						Client
					</label>
				</div>
				<div className="form-check ms-3">
					<input 
					className="form-check-input" 
					type="radio" 
					name="role" 
					id="coach" 
					value="coach" 
					onChange={(e) => setSelectedRole(e.target.value)}/>
					<label className="form-check-label" htmlFor="coach">
						Coach
					</label>
				</div>
				</div>
                {store.errorForm &&                 
                <div className="alert alert-danger mt-4 py-2 d-flex justify-content-center col-6 offset-3" role="alert">
                    {store.errorForm}
                </div>
                }
				{errorRole &&                 
                <div className="alert alert-danger mt-4 py-2 d-flex justify-content-center col-6 offset-3" role="alert">
                    {errorRole}
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
