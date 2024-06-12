import React, { useContext, useState, useEffect,} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Dashboard = () => {
	const { store, actions } = useContext(Context);
	const [position, setPosition] = useState({ top: '0px', left: '0px' });
	const [username, setUsername] = useState("");
	const [currentUser, setCurrentUser] = useState("");
	const [currentUserList, setCurrentUserList] = useState("");
	const [totalMatches, setTotalMatches] = useState(0); // Nueva variable de estado para el total de matches
	const [totalGivenLikes, setTotalGivenLikes] = useState(0); // Nueva variable de estado para el total de given likes
	const [totalReceivedLikes, setTotalReceivedLikes] = useState(0); // Variable de estado para el total de received likes
	const [totalUsers, setTotalUsers] = useState(0); // Variable de estado para el total de coaches o clients
	const loggedCoach = JSON.parse(localStorage.getItem("loggedCoach"));
	const loggedClient = JSON.parse(localStorage.getItem("loggedClient"));

	useEffect(() => {
		const fetchData = async () => {
			if (loggedCoach) {
				setUsername(loggedCoach.username);
				setCurrentUser("coach");
				setCurrentUserList("client");
				await actions.getGivenLikes(loggedCoach.id);
				await actions.getReceivedLikes(loggedCoach.id);
				await actions.getUserMatches(loggedCoach.id);
				await actions.getClients();
			} else if (loggedClient) {
				setUsername(loggedClient.username);
				setCurrentUser("client");
				setCurrentUserList("coach");
				await actions.getGivenLikes(loggedClient.id);
				await actions.getReceivedLikes(loggedClient.id);
				await actions.getUserMatches(loggedClient.id);
				await actions.getCoaches();
			}
		};
			fetchData();
	}, []);

	useEffect(() => {
			setTotalMatches(currentUser === "coach" ? store.matchesCoach.length : store.matchesClient.length);
			setTotalGivenLikes(currentUser === "coach" ? store.givenLikesCoach.length : store.givenLikesClient.length);
			setTotalReceivedLikes(currentUser === "coach" ? store.receivedLikesCoach.length : store.receivedLikesClient.length);			
			setTotalUsers(currentUser === "coach" ? store.clients.length : store.coaches.length);
		}, [store.matchesCoach.length, store.matchesClient.length, store.givenLikesCoach.length, store.givenLikesClient.length, store.receivedLikesCoach.length, store.receivedLikesClient.length, store.coaches.length, store.clients.length, currentUser]);

	const handleMouseMove = (event) => {
        const rect = event.target.getBoundingClientRect();
        setPosition({
            top: `${event.clientY - rect.top}px`,
            left: `${event.clientX - rect.left}px`,
        });
    };

	return (
		<div className="container-fluid dashboard" onMouseMove={handleMouseMove}>
					{/* <div className="col-12 col-xl-10">
                    <div className="d-flex flex-row align-items-center card card-ui-default-1 bg-secondary p-4 col-12">
                        <i className="fa-solid fa-users fs-3 text-secondary"></i>
                        <h4 className="ms-3 fw-semibold mb-0">Welcome to your dashboard {username}!</h4>
                    </div>
                	</div> */}
					<div className="row">
						<div className="col-xl-6 col-12">
							<div className="card avtivity-card riding">
								<div className="card-body">
									<div className="media align-items-center d-flex justify-content-between">
										<div className="mt-4 ms-4">
											<span className={`activity-icon text-success bgl-success me-md-4 me-3 ${currentUserList === "client" ? 'fa-regular fa-user fs-3' : 'fa-solid fa-dumbbell fs-3'}`}>
											</span>
											<div className="media-body d-flex align-items-center mb-2">
												<p className="fs-14 mb-2 me-3">Number of {currentUserList}</p>
												<span className="title text-black font-w600 mb-1">{totalUsers}</span>
											</div>
										</div>
										<Link to={`/${currentUserList}`}>
											<button className="btn btn-success p-4 me-4 mt-5 rounded-4">Go to {currentUserList} list</button>
										</Link>
									</div>
								</div>
								<div className="effect bg-success"style={{ top: position.top, left: position.left }}></div>
							</div>
						</div>
						<div className="col-xl-6 col-12">
							<div className="card avtivity-card muscle">
								<div className="card-body">
								<div className="media align-items-center d-flex justify-content-between">
									<div className="mt-4 ms-4">
										<span className="activity-icon text-info bgl-info me-md-4 me-3 fa-regular fa-share-from-square fs-3">	
										</span>
										<div className="media-body d-flex align-items-center mb-2">
											<p className="fs-14 mb-2 me-3">Request sent</p>
											<span className="title text-black font-w600 mb-1">{totalGivenLikes}</span>
										</div>
									</div>
										<Link to={`/${currentUser}/likes/given`}>
												<button className="btn btn-info p-4 me-4 mt-5 rounded-4">Go to my request sent</button>
										</Link>
									</div>
								</div>
								<div className="effect bg-info" style={{ top: position.top, left: position.left }}></div>
							</div>
						</div>
						<div className="col-xl-6 col-12">
							<div className="card avtivity-card ciclyng">
								<div className="card-body">
									<div className="media align-items-center d-flex justify-content-between">
									<div className="mt-4 ms-4">
										<span className="activity-icon text-danger bgl-danger me-md-4 me-3 fa-regular fa-envelope fs-3">
										</span>
										<div className="media-body d-flex align-items-center mb-2">
											<p className="fs-14 mb-2 me-3">Pending request</p>
											<span className="title text-black font-w600 mb-1">{totalReceivedLikes}</span>
										</div>
									</div>
										<Link to={`/${currentUser}/likes/received`}>
											<button className="btn btn-danger p-4 me-4 mt-5 rounded-4">Go to my received request</button>
										</Link>
									</div>
								</div>
								<div className="effect bg-danger" style={{ top: position.top, left: position.left }}></div>
							</div>
						</div>
						<div className="col-xl-6 col-12">
							<div className="card avtivity-card matches">
								<div className="card-body">
									<div className="media align-items-center d-flex justify-content-between">
									<div className="mt-4 ms-4">
										<span className="activity-icon text-warning bgl-warning me-md-4 me-3 fa-solid fa-person-running fs-3">
										</span>
										<div className="media-body d-flex align-items-center mb-2">
											<p className="fs-14 mb-2 me-3">{currentUser === "coach" ? "Your clients ready to train": "Your coaches ready to train you"}</p>
											<span className="title text-black font-w600 mb-1">{totalMatches}</span>
										</div>
									</div>
										<Link to={`/${currentUser}/match`}>
											<button className="btn btn-warning p-4 me-4 mt-5 rounded-4">{currentUser === "coach" ? "Go to your clients": "Go to your coaches"}</button>
										</Link>
									</div>
								</div>
								<div className="effect bg-warning" style={{ top: position.top, left: position.left }}></div>
							</div>
					</div>
				</div>
			</div>
	);
};
