import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [username, setUsername] = useState("");
	const [currentUser, setCurrentUser] = useState("");
	const [currentUserID, setCurrentUserID] = useState(0);
	const [currentUserList, setCurrentUserList] = useState("");
	const loggedCoach = JSON.parse(localStorage.getItem("loggedCoach"));
	const loggedClient = JSON.parse(localStorage.getItem("loggedClient"));

	useEffect(() => {
		if (loggedCoach) {
			setUsername(loggedCoach.username);
			setCurrentUser("coach")
			setCurrentUserID(loggedCoach.id)
			setCurrentUserList("client")
		}
		else if (loggedClient) {
			setUsername(loggedClient.username);
			setCurrentUser("coach")
			setCurrentUserID(loggedClient.id)
			setCurrentUserList("coach")
		}
	}, [actions]);

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ms-auto" >
				<ul className="navbar-nav me-auto mb-2 mb-lg-0 title">
						<li className="nav-item my-auto fw-bold">
							<Link to={`/${currentUser}/${currentUserID}`} className="nav-link active">
								My Profile
							</Link>
						</li>
						<li className="nav-item my-auto fw-bold">
							<Link to={`/${currentUserList}`} className="nav-link active">
								{currentUserList === "client" ? "Client List" : "Coach List"}
							</Link>
						</li>
						<li className="nav-item my-auto fw-bold">
							<Link to={`/${currentUser}/likes/given`} className="nav-link active">
								Given Likes
							</Link>
						</li>
						<li className="nav-item my-auto fw-bold">
							<Link to={`/${currentUser}/likes/nogiven`}  className="nav-link active">
								No Given Likes
							</Link>
						</li>
						<li className="nav-item my-auto fw-bold">
							<Link to={`/${currentUser}/likes/received`}  className="nav-link active">
								Received Likes
							</Link>
						</li>
						<li className="nav-item my-auto fw-bold">
							<Link to={`/${currentUser}/match`}  className="nav-link active">
								Matches
							</Link>
						</li>
					</ul>					
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
