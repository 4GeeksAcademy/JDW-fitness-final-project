import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
	const [nullElement, setNullElement] = useState(null);
	const navigate = useNavigate()

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
		if (store.singleCoach) {
			const nullElementFound = Object.keys(store.singleCoach).some((key) => store.singleCoach[key] === null);
			setNullElement(nullElementFound);
		}
	}, [store.singleCoach]);
	
	useEffect(() => {
		if (store.singleClient) {
			const nullElementFound = Object.keys(store.singleClient).some((key) => store.singleClient[key] === null);
			setNullElement(nullElementFound);
		}
	}, [store.singleClient]);

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
			  <Link to={`/${currentUser}/calculator`} className="dropdown-item ai-icon fw-bold fs-5 d-flex">
			  <i className="fa-solid fa-calculator fs-4"></i>
			  {!isSidebarOpen &&
				<h5 className="ms-2 fw-bold">Fitness Calculator</h5>
				}
				</Link>
			  </div>
				<div className="d-flex align-items-center ms-auto me-4">
			  	<div className="nav-item dropdown notification_dropdown me-5">
                                <a className="nav-link ai-icon-notification rounded-3" role="button" data-bs-toggle="dropdown">
                                    <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M22.75 15.8385V13.0463C22.7471 10.8855 21.9385 8.80353 20.4821 7.20735C19.0258 5.61116 17.0264 4.61555 14.875 4.41516V2.625C14.875 2.39294 14.7828 2.17038 14.6187 2.00628C14.4546 1.84219 14.2321 1.75 14 1.75C13.7679 1.75 13.5454 1.84219 13.3813 2.00628C13.2172 2.17038 13.125 2.39294 13.125 2.625V4.41534C10.9736 4.61572 8.97429 5.61131 7.51794 7.20746C6.06159 8.80361 5.25291 10.8855 5.25 13.0463V15.8383C4.26257 16.0412 3.37529 16.5784 2.73774 17.3593C2.10019 18.1401 1.75134 19.1169 1.75 20.125C1.75076 20.821 2.02757 21.4882 2.51969 21.9803C3.01181 22.4724 3.67904 22.7492 4.375 22.75H9.71346C9.91521 23.738 10.452 24.6259 11.2331 25.2636C12.0142 25.9013 12.9916 26.2497 14 26.2497C15.0084 26.2497 15.9858 25.9013 16.7669 25.2636C17.548 24.6259 18.0848 23.738 18.2865 22.75H23.625C24.321 22.7492 24.9882 22.4724 25.4803 21.9803C25.9724 21.4882 26.2492 20.821 26.25 20.125C26.2486 19.117 25.8998 18.1402 25.2622 17.3594C24.6247 16.5786 23.7374 16.0414 22.75 15.8385ZM7 13.0463C7.00232 11.2113 7.73226 9.45223 9.02974 8.15474C10.3272 6.85726 12.0863 6.12732 13.9212 6.125H14.0788C15.9137 6.12732 17.6728 6.85726 18.9703 8.15474C20.2677 9.45223 20.9977 11.2113 21 13.0463V15.75H7V13.0463ZM14 24.5C13.4589 24.4983 12.9316 24.3292 12.4905 24.0159C12.0493 23.7026 11.716 23.2604 11.5363 22.75H16.4637C16.284 23.2604 15.9507 23.7026 15.5095 24.0159C15.0684 24.3292 14.5411 24.4983 14 24.5ZM23.625 21H4.375C4.14298 20.9999 3.9205 20.9076 3.75644 20.7436C3.59237 20.5795 3.50014 20.357 3.5 20.125C3.50076 19.429 3.77757 18.7618 4.26969 18.2697C4.76181 17.7776 5.42904 17.5008 6.125 17.5H21.875C22.571 17.5008 23.2382 17.7776 23.7303 18.2697C24.2224 18.7618 24.4992 19.429 24.5 20.125C24.4999 20.357 24.4076 20.5795 24.2436 20.7436C24.0795 20.9076 23.857 20.9999 23.625 21Z" fill="#A02CFA"></path>
									</svg>
									{nullElement && <div className="pulse-css"></div>}
                                </a>
                                <div className="dropdown-menu rounded dropdown-menu-lg-end dropdown-menu-start">
                                    <div id="DZ_W_Notification1" className={`widget-media dz-scroll-notifications pe-1 ps-3 py-3 ${!nullElement ? 'height-no-notifications0' : 'height38'}`}>
											{!nullElement &&	
														<h6 className="my-1 text-center">No notifications</h6>
												}
										<ul className="timeline ps-1">
											{nullElement && 
											<li>
												<div className="timeline-panel">
													<div className="media mx-3">
													<i className="fa-solid fa-list-ul me-4"></i>
													</div>
													<div className="media-body">
														<h6 className="mb-1">Complete your profile
														<Link to={`/${currentUser}/${currentUserID}`} ><i className="fa-solid fa-user-pen fs-5 ms-2 text-secondary"></i></Link>
														</h6>
														{loggedClient && <small className="d-block">Use our fitness calculator too <i className="fa-regular fa-face-laugh-wink"></i></small>}
													</div>
												</div>
											</li>
											}
										</ul>
									</div>
                                </div>
                    </div>
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
				<img src={sideBarLogo} alt="logo-with-name" type="button" className={`${isSidebarOpen ? 'logo-sidebar-open' : 'logo-sidebar-closed'}`} onClick={() => navigate("/home")}/>
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
