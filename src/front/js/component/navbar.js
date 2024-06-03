import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [username, setUsername] = useState("");
	const storedCoach = localStorage.getItem("loggedCoach");
	const storedClient = localStorage.getItem("loggedClient");

    useEffect(() => {
        actions.getCoaches()
        actions.getClients()
    },[]);

	useEffect(() => {
		if (storedCoach) setUsername(storedCoach);
		else if (storedClient) setUsername(storedClient);
	}, [actions]);


	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="mx-auto">
					<Link to="/coach">
						<button className="btn btn-primary">Profile</button>
          			</Link>
        		</div>
				{ (store.authCoach || store.authClient) && 				
				<div className="ms-auto">
					<span className="fw-bold me-4">{username}'s session</span>
					<Link to="/">
						<button onClick={actions.logout} className="btn btn-primary">Log out</button>
					</Link>
				</div>		
				}
			</div>
		</nav>
	);
};
