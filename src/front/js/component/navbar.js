import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import ProfileImage from "../component/profileImage"
import sideBarLogo from "/workspaces/JDW-fitness-final-project/src/front/img/sidebar-logo.png"
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

	const fetchSingleClient = async (client_id) => {
		await actions.getSingleClient(client_id);
	};
	const fetchSingleCoach = async (coach_id) => {
		await actions.getSingleCoach(coach_id);
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
		actions.toggleSidebar();
	  };

	return (
		<div className="App">
		  <nav className={`navbar bg-body-light ${isSidebarOpen ? 'navbar-main-open' : 'navbar-main-closed'}`}>
			<div className="container-fluid">
			  <div className="d-flex align-items-center">
			  <button className="btn fa-solid fa-bars-staggered mx-3 fs-2 text-secondary" type="button" onClick={toggleSidebar}></button>
			  <Link to={"/calculator"} className="dropdown-item ai-icon fw-bold fs-5 d-flex">
			  <i className="fa-solid fa-calculator fs-4"></i>
			  {!isSidebarOpen &&
				<h5 className="ms-2 fw-bold">Fitness Calculator</h5>
				}
				</Link>
			  </div>
				<div className="d-flex align-items-center ms-auto me-4">
					{loggedCoach ? 
                    <ProfileImage photoUrl={store.singleCoach.coach_photo_url} className="navbar-profile-image" rounded/>
					:
                    <ProfileImage photoUrl={store.singleClient.client_photo_url} className="navbar-profile-image" rounded/>
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

				<img src={sideBarLogo} alt="logo-with-name" className={`${isSidebarOpen ? 'logo-sidebar-open' : 'logo-sidebar-closed'}`}/>

			  {isSidebarOpen && <button type="button" className="btn-close" onClick={toggleSidebar}></button>}
			</div>
			<div className="sidebar-body">
			  <ul className="navbar-nav">
				<li className={currentUserList === "client" ? "nav-item fw-bold my-4 ps-2" : "nav-item fw-bold my-4 ps-1"}>
				  	<Link to={`/${currentUserList}`} className="nav-link active">
				  	{currentUserList === "client" ? 
				  	<i className="fa-regular fa-user fs-3"></i>
				  	:
				  	<i className="fa-solid fa-dumbbell fs-3"></i> 
				  	}
					{(isSidebarOpen && currentUserList === "client") &&
					<span className="ms-2 fs-5">Client List</span>
					}
					{(isSidebarOpen && currentUserList === "coach") &&
					<span className="ms-2 fs-5">Coach List</span>
					}
				  </Link>
				</li>
				<li className="nav-item fw-bold ps-2 my-4">
				  <Link to={`/${currentUser}/likes/given`} className="nav-link active">
				  <i className="fa-regular fa-share-from-square fs-3"></i>
					{isSidebarOpen && <span className="ms-2 fs-5">Request sent</span>}
				  </Link>
				</li>
				<li className="nav-item fw-bold ps-2 my-4">
				  <Link to={`/${currentUser}/likes/received`} className="nav-link active">
				  <i className="fa-regular fa-envelope fs-3"></i>
					{isSidebarOpen && <span className="ms-2 fs-5">Pending Request</span>}
				  </Link>
				</li>
				<li className="nav-item fw-bold ps-2 my-4">
				  <Link to={`/${currentUser}/match`} className="nav-link active">
				  <i className="fa-solid fa-person-running fs-3"></i>
					{isSidebarOpen && <span className="ms-2 fs-5">Ready to Train</span>}
				  </Link>
				</li>
			  </ul>
			</div>
		  </div>
		</div>
	  );
};
