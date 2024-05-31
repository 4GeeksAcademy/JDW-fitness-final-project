import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [username, setUsername] = useState("");

	useEffect(() => {
		const storedUsername = localStorage.getItem("loggedCoach");
		if (storedUsername) {
			setUsername(storedUsername);
		}
	}, [actions]);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="mx-auto">
					<Link to="/coach">
						<button className="btn btn-primary">Coaches</button>
          			</Link>
        		</div>
				{store.authCoach && 				
				<div className="ms-auto">
					<span className="fw-bold me-4">{username}'s session</span>
					<Link to="/">
						<button onClick={actions.logoutCoach} className="btn btn-primary">Log out</button>
					</Link>
				</div>		
				}
			</div>
		</nav>
	);
};
