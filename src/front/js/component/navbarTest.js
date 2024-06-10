import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";

export const NavbarTest = () => {
	const { store, actions } = useContext(Context);
	const [username, setUsername] = useState("");
	const [currentUser, setCurrentUser] = useState("");
	const [currentUserID, setCurrentUserID] = useState(0);
	const [currentUserList, setCurrentUserList] = useState("");
	const loggedCoach = JSON.parse(localStorage.getItem("loggedCoach"));
	const loggedClient = JSON.parse(localStorage.getItem("loggedClient"));
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const navigate = useNavigate()


	// useEffect(() => {
	// 	if (loggedCoach) {
	// 		setUsername(loggedCoach.username);
	// 		setCurrentUser("coach")
	// 		setCurrentUserID(loggedCoach.id)
	// 		setCurrentUserList("client")
	// 	}
	// 	else if (loggedClient) {
	// 		setUsername(loggedClient.username);
	// 		setCurrentUser("client")
	// 		setCurrentUserID(loggedClient.id)
	// 		setCurrentUserList("coach")
	// 	}
	// }, [actions]);

	useEffect(() => {
		const fetchSingleClient = async (id) => {
			await actions.getSingleClient(id);
		};
		const fetchSingleCoach = async (id) => {
			await actions.getSingleCoach(id);
		};
		if (loggedCoach) {
			fetchSingleCoach(loggedCoach.id)
			setUsername(loggedCoach.username);
			setCurrentUser("coach")
			setCurrentUserID(loggedCoach.id)
			setCurrentUserList("client")
		}
		else if (loggedClient) {
			fetchSingleClient(loggedClient.id)
			setUsername(loggedClient.username);
			setCurrentUser("client")
			setCurrentUserID(loggedClient.id)
			setCurrentUserList("coach")
		}
	}, [actions.logout, loggedClient, loggedCoach]);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	  };

	return (
		<div className="App">
		  <nav className="navbar bg-body-light">
			<div className="container-fluid">
			  <a className="navbar-brand" href="#">
				<h5 className="mb-0 text-secondary">JDW</h5>
			  </a>
			  <button className="btn fa-solid fa-bars-staggered ms-3 me-auto fs-2 text-secondary" type="button" onClick={toggleSidebar}></button>
				<div className="d-flex align-items-center ms-auto me-4">
					<i className="fa-solid fa-user fs-3 me-3"></i>
					<div class="nav-item dropdown header-profile">
						<a class="nav-link" href="javascript:void(0)" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							<div class="header-info">
								<span class="text-black"><strong>{username}</strong></span>
								<p class="fs-12 mb-0 first-letter-uppercase">{currentUser}</p>
							</div>
						</a>
						{ (store.authCoach || store.authClient) ?	
						<div class="dropdown-menu dropdown-menu-end">
							<Link to={`/${currentUser}/${currentUserID}`} className="dropdown-item ai-icon">
								<svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" class="text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
								<span class="ms-2">Profile </span>
							</Link>
							<Link to="/" class="dropdown-item ai-icon" onClick={() => {actions.logout}}>
								<svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" class="text-danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
								<span class="ms-2">Logout </span>
							</Link>
						</div>
						:
						navigate("/")
						}
					</div>
				</div>
			</div>
		  </nav>
	
		  <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
			<div className="sidebar-header">
			  <h5 className="text-secondary">Logo JDW</h5>
			  {isSidebarOpen && <button type="button" className="btn-close" onClick={toggleSidebar}></button>}
			</div>
			<div className="sidebar-body">
			  <ul className="navbar-nav">
				<li className="nav-item my-auto fw-bold ps-2">
				  	<Link to={`/${currentUserList}`} className="nav-link active">
				  	{currentUserList === "client" ? 
				  	<i className="fa-regular fa-user fs-2"></i>
				  	:
				  	<i className="fa-solid fa-dumbbell fs-2"></i> 
				  	}
					{(isSidebarOpen && currentUserList === "client") &&
					<span className="ms-2">Client List</span>
					}
					{(isSidebarOpen && currentUserList === "coach") &&
					<span className="ms-2">Coach List</span>
					}
				  </Link>
				</li>
				<li className="nav-item my-auto fw-bold">
				  <Link to={`/${currentUser}/likes/given`} className="nav-link active">
					<i className="bi bi-hand-thumbs-up-fill"></i>
					{isSidebarOpen && <span>Given Likes</span>}
				  </Link>
				</li>
				<li className="nav-item my-auto fw-bold">
				  <Link to={`/${currentUser}/likes/nogiven`} className="nav-link active">
					<i className="bi bi-hand-thumbs-down-fill"></i>
					{isSidebarOpen && <span>No Given Likes</span>}
				  </Link>
				</li>
				<li className="nav-item my-auto fw-bold">
				  <Link to={`/${currentUser}/likes/received`} className="nav-link active">
					<i className="bi bi-envelope-fill"></i>
					{isSidebarOpen && <span>Received Likes</span>}
				  </Link>
				</li>
				<li className="nav-item my-auto fw-bold">
				  <Link to={`/${currentUser}/match`} className="nav-link active">
					<i className="bi bi-heart-fill"></i>
					{isSidebarOpen && <span>Matches</span>}
				  </Link>
				</li>
			  </ul>
			</div>
		  </div>
		</div>
	  );
};