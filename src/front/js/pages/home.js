import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import helloThere from "/workspaces/JDW-fitness-final-project/src/front/img/obiwan.png";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<img src={helloThere} atl="hello there" className="rounded-circle mb-3"/>
			<h1>Hello There!</h1>
            <Link to="/coach/login">
				<button className="btn btn-primary ms-3 mb-3 fw-bold" >Login Coach</button>
			</Link>
			<div className="alert alert-info">
				{store.message || "Componente  a editar para la vista de JDW"}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
