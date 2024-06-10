import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import helloThere from "/workspaces/JDW-fitness-final-project/src/front/img/obiwan.png";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 mainWrapper">
			<h1>WELCOME TO JDW FITNESS!!</h1>
			<h2>Join to us and become a Jidower!</h2>
			<p>Why should you create an account and be part of JDW Fitness? About Us</p>
			<p>Are you already part of JDW Fitness? 				
            <Link to="/login">
				<button className="btn btn-primary ms-3 mb-3 fw-bold" >Login</button>
			</Link>
				</p>
			<p>Are you not part of JDW Fitness yet?				
            <Link to="/signup">
				<button className="btn btn-primary ms-3 mb-3 fw-bold" >Sign Up</button>
			</Link>
				</p>
		</div>
	);
};
