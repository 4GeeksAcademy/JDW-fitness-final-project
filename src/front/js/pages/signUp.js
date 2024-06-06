import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import helloThere from "/workspaces/JDW-fitness-final-project/src/front/img/obiwan.png";
import "../../styles/home.css";

export const SignUp = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<img src={helloThere} atl="hello there" className="rounded-circle mb-4"/>
			<h2 className="mb-3">Before sign up... Choose your role </h2>		
            <Link to="/client/signup">
				<button className="btn btn-success ms-3 mb-3 fw-bold" >Client</button>
			</Link>
			
            <Link to="/coach/signup">
				<button className="btn btn-warning ms-3 mb-3 fw-bold" >Coach</button>
			</Link>

		</div>
	);
};
