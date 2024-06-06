import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

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
			<h1 className="text-center mt-3">Received Like List</h1>
			<ul>
				{store.receivedLikesClient.map((user, index) => 
					<li key={index} className="list-group-item my-2 border-3">
						<div className="d-flex flex-column justify-content-center">
							<div className="d-flex">
								<span className="fw-bold">Username: </span>
								{user.username}
								{matchedCoaches.includes(user.id) ? (
                                    <span className="alert alert-success py-0 px-1 ms-auto mt-1 fw-bold">Match done!</span>
                                ) : (
                                    <button className="btn btn-warning py-0 px-1 ms-auto mt-1 fw-semibold" onClick={() => addSingleLike(user.id)}>Request to Train</button>
                                )}
							</div>
						</div>
					</li>
				)}
			</ul>
		</div>
	);
};