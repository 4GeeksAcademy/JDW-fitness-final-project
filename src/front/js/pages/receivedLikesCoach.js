import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ProfileImage from "../component/profileImage"

import { Context } from "../store/appContext";

export const ReceivedLikesCoach = () => {
	const { store, actions } = useContext(Context);
    const loggedCoach = JSON.parse(localStorage.getItem("loggedCoach"));
	const [matchedClients, setMatchedClients] = useState([]);
	

    useEffect(() => {
		actions.getReceivedLikes(loggedCoach.id)
		actions.getMatches()
    },[])

    useEffect(() => {
        // Actualizar la lista de clientes con match cuando store.matches cambie
        const coachMatches = store.matches.filter(match => match.coach_id === loggedCoach.id);
        const matchedClientIDs = coachMatches.map(match => match.client_id);
        setMatchedClients(matchedClientIDs);
    }, [store.matches, loggedCoach.id]);

	const addSingleLike = (clientID) => {
		actions.addLikeAPI("coach", clientID, loggedCoach.id);
		if (!matchedClients.includes(clientID)) {
            setMatchedClients([...matchedClients, clientID]);
        }
	}

	return (
		<div className="container">
			<div className="row d-flex justify-content-center">
			<div className="col-10 col-xl-10">
				<div className="d-flex flex-row align-items-center card card-ui-default-1 bg-secondary p-4 col-12">
					<i className="fa-solid fa-users fs-2 text-secondary"></i>
					<h1 className="ms-3">Pending Requests</h1>
				</div>
			</div>
			{store.receivedLikesCoach.map((user, index) => 
				<div key={index} className="col-10 col-xl-10">
					<div className="card card-ui-default-1 bg-secondary col-12">
						<div className="card-body mb-0 d-flex justify-content-between align-items-center">
							<div className="d-flex">
							<ProfileImage photoUrl={user.client_photo_url} sizeClass="client-profile-image" />
								<div className="d-flex flex-column justify-content-center ms-3">
									<h5 className="card-title mb-3">{user.username}</h5>
									<Link to={`/client/${user.id}`} className="btn btn-card rounded-5">
										<span>Show more information</span>
									</Link>
								</div>
							</div>
							{matchedClients.includes(user.id) ? (
									<div>
                                        <div className="alert alert-success left-icon-big alert-dismissible fade show">
                                            <div className="media">
                                                <div className="alert-left-icon-big">
                                                    <span><i className="mdi mdi-check-circle-outline"></i></span>
                                                </div>
                                                <div className="media-body">
                                                    <h5 className="mt-1 mb-2">Congratulations!</h5>
                                                    <p className="mb-0">Your client is ready to train with you <i className="fa-solid fa-hand-fist fs-4 ms-1"></i></p>
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