import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ProfileImage from "../component/profileImage"

import { Context } from "../store/appContext";

export const ReceivedLikesClient = () => {
	const { store, actions } = useContext(Context);
    const loggedClient = JSON.parse(localStorage.getItem("loggedClient"));
	const [matchedCoaches, setMatchedCoaches] = useState([]);

    useEffect(() => {
		actions.getReceivedLikes(loggedClient.id)
		actions.getMatches()
    },[])

    useEffect(() => {
        // Actualizar la lista de coaches con match cuando store.matches cambie
        const clientMatches = store.matches.filter(match => match.client_id === loggedClient.id);
        const matchedCoachIDs = clientMatches.map(match => match.coach_id);
        setMatchedCoaches(matchedCoachIDs);
    }, [store.matches, loggedClient.id]);

	const addSingleLike = (coachID) => {
		actions.addLikeAPI("client", loggedClient.id, coachID);
		if (!matchedCoaches.includes(coachID)) {
            setMatchedCoaches([...matchedCoaches, coachID]);
        }
	}

	return (
<div className="container">
			<div className="row d-flex justify-content-center">
			<div className="col-10 col-xl-10">
				<div className="d-flex flex-row align-items-center card card-ui-default-1 bg-secondary p-4 col-12">
					<i className="fa-regular fa-envelope fs-3 text-secondary"></i>
					<h4 className="ms-3 fw-semibold mb-0">Pending Requests</h4>
				</div>
			</div>
			{store.receivedLikesClient.map((user, index) => 
				<div key={index} className="col-10 col-xl-10">
					<div className="card card-ui-default-1 bg-secondary col-12">
						<div className="card-body mb-0 d-flex justify-content-between align-items-center">
							<div className="d-flex">
							<ProfileImage photoUrl={user.coach_photo_url} sizeClass="user-profile-image" />
								<div className="d-flex flex-column justify-content-center ms-3">
									<h5 className="card-title mb-3">{user.username}</h5>
									<Link to={`/coach/${user.id}`} className="btn btn-card rounded-5">
										<span>Show more information</span>
									</Link>
								</div>
							</div>
							{matchedCoaches.includes(user.id) ? (
									<div>
                                        <div className="alert alert-success left-icon-big alert-dismissible fade show">
                                            <div className="media">
                                                <div className="alert-left-icon-big">
                                                    <span><i className="mdi mdi-check-circle-outline"></i></span>
                                                </div>
                                                <div className="media-body">
                                                    <h5 className="mt-1 mb-2">Congratulations!</h5>
                                                    <p className="mb-0">This Coach is ready to train you <i className="fa-solid fa-hand-fist fs-4 ms-1"></i></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <button className="btn btn-secondary btn-request fw-semibold" onClick={() => addSingleLike(user.id)}>
										Accept request
										<span className="btn-icon-right ms-3"><i className="fa-regular fa-handshake"></i></span>
									</button>
                                )}
						</div>
					</div>
				</div>
			)}
		</div>
		</div>
	);
};