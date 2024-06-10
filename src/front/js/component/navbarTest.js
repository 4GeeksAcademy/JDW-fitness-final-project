import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const NavbarTest = () => {
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
        <>
        <nav className="navbar bg-body-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                {/* <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/> */}
                <h5 className="mb-0 text-secondary">Logo JDW</h5>
                </a>
                    <button className="btn fa-solid fa-arrow-right-from-bracket me-auto fs-2 text-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"></button>
            <div className="d-flex align-items-center ms-auto">
					<i className="fa-solid fa-user fs-3 me-3"></i>
					<Link to={`/${currentUser}/${currentUserID}`} className="nav-link active">
						<button className="btn btn-dark fw-bold me-2">{username}</button>
					</Link>
					<Link to="/" onClick={actions.logout}>
						Log out
					</Link>
				</div>
            </div>
        </nav>

        <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title text-secondary" id="offcanvasScrollingLabel">Logo JDW</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <p>Try scrolling the rest of the page to see this option in action.</p>
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
            </div>
        </div>
        </>
	);
};