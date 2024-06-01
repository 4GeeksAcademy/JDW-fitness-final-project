import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import helloThere from "/workspaces/JDW-fitness-final-project/src/front/img/obiwan.png";
import "../../styles/home.css";

export const SignUp = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<img src={helloThere} atl="hello there" className="rounded-circle mb-3"/>
			<h1 className="mb-4">Before sing up... Choose your role</h1>			
            <Link to="/client/signup">
				<button className="btn btn-success ms-3 mb-3 fw-bold" >Client</button>
			</Link>
            <Link to="/coach/signup">
				<button className="btn btn-primary ms-3 mb-3 fw-bold" >Coach</button>
			</Link>
		</div>
	);
};
