import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import ProfileImage from "../component/profileImage"
import "../../styles/navbar.css";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [username, setUsername] = useState("");
	const [currentUser, setCurrentUser] = useState("");
	const [currentUserID, setCurrentUserID] = useState(0);
	const [currentUserList, setCurrentUserList] = useState("");
	const loggedCoach = JSON.parse(localStorage.getItem("loggedCoach"));
	const loggedClient = JSON.parse(localStorage.getItem("loggedClient"));
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const navigate = useNavigate()

	const fetchSingleClient = async (id) => {
		await actions.getSingleClient(id);
	};
	const fetchSingleCoach = async (id) => {
		await actions.getSingleCoach(id);
	};

	useEffect(() => {
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
	}, [actions.logout]);

	useEffect(() => {
		if (loggedCoach) {
			fetchSingleCoach(loggedCoach.id)
		}
		else if (loggedClient) {
			fetchSingleClient(loggedClient.id)
		}
	}, [store.singleCoach.coach_photo_url, store.singleClient.client_photo_url]);

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
					{loggedCoach ? 
                    <ProfileImage photoUrl={store.singleCoach.coach_photo_url} sizeClass="navbar-profile-image" />
					:
                    <ProfileImage photoUrl={store.singleClient.client_photo_url} sizeClass="navbar-profile-image" />
					}
					<div className="nav-item dropdown header-profile">
						<a className="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							<div className="header-info">
								<span className="text-black"><strong>{username}</strong></span>
								<p className="fs-12 mb-0 first-letter-uppercase">{currentUser}</p>
							</div>
						</a>
						<div className="dropdown-menu dropdown-menu-end">
							<Link to={`/${currentUser}/${currentUserID}`} className="dropdown-item ai-icon">
								<svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
								<span className="ms-2">Profile </span>
							</Link>
							<Link to="/" className="dropdown-item ai-icon">
								<svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
								<span className="ms-2" type="button" onClick={actions.logout}>Logout </span>
							</Link>
						</div>
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
				<li className="nav-item fw-bold ps-2 my-4">
				  	<Link to={`/${currentUserList}`} className="nav-link active">
				  	{currentUserList === "client" ? 
				  	<i className="fa-regular fa-user fs-2"></i>
				  	:
				  	<i className="fa-solid fa-dumbbell fs-2"></i> 
				  	}
					{(isSidebarOpen && currentUserList === "client") &&
					<span className="ms-2 fs-4">Client List</span>
					}
					{(isSidebarOpen && currentUserList === "coach") &&
					<span className="ms-2 fs-4">Coach List</span>
					}
				  </Link>
				</li>
				<li className="nav-item fw-bold ps-2 my-4">
				  <Link to={`/${currentUser}/likes/given`} className="nav-link active">
				  <i className="fa-regular fa-share-from-square fs-2"></i>
					{isSidebarOpen && <span className="ms-2 fs-4">Resquest sent</span>}
				  </Link>
				</li>
				{/* <li className="nav-item my-auto fw-bold">
				  <Link to={`/${currentUser}/likes/nogiven`} className="nav-link active">
					<i className="bi bi-hand-thumbs-down-fill"></i>
					{isSidebarOpen && <span>No Given Likes</span>}
				  </Link>
				</li> */}
				<li className="nav-item fw-bold ps-2 my-4">
				  <Link to={`/${currentUser}/likes/received`} className="nav-link active">
				  <i className="fa-regular fa-envelope fs-2"></i>
					{isSidebarOpen && <span className="ms-2 fs-4">Pending Request</span>}
				  </Link>
				</li>
				<li className="nav-item fw-bold ps-2 my-4">
				  <Link to={`/${currentUser}/match`} className="nav-link active">
				  <i className="fa-solid fa-person-running fs-2"></i>
					{isSidebarOpen && <span className="ms-2 fs-4">Ready to Train</span>}
				  </Link>
				</li>
			  </ul>
			</div>
		  </div>
		</div>
	  );
};