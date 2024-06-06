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
			setCurrentUser("client")
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
				{(store.authCoach || store.authClient) &&				
					<div className="ms-auto" >
						<ul className="navbar-nav me-auto mb-2 mb-lg-0 title">
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
				}
				{ (store.authCoach || store.authClient) ? 				
				<div className="d-flex align-items-center ms-auto">
					<i className="fa-solid fa-user fs-3 me-3"></i>
					<Link to={`/${currentUser}/${currentUserID}`} className="nav-link active">
						<button className="btn btn-dark fw-bold me-2">{username}</button>
					</Link>
					<Link to="/" onClick={actions.logout}>
						Log out
					</Link>
				</div>
				:
				<div>
				<Link to="/signup" onClick={actions.logout} className="me-1">
					Sign Up
				</Link>
				/	
				<Link to="/login" onClick={actions.logout} className="ms-1">
					Login
				</Link>	
				</div>
				}
			</div>
		</nav>
	);
};
