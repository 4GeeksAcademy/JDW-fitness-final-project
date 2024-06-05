import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const ReceivedLikes = () => {
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
			<h1 className="text-center mt-3">Received Like List</h1>
			<ul>
				{store.receivedLikesCoach.map((user, index) => 
					<li key={index} className="list-group-item my-2 border-3">
						<div className="d-flex flex-column justify-content-center">
							<div className="d-flex">
								<span className="fw-bold">Username: </span>
								{user.username}
								{matchedClients.includes(user.id) ? (
                                    <span className="alert alert-success py-0 px-1 ms-auto mt-1">match done!</span>
                                ) : (
                                    <button className="btn btn-warning py-0 px-1 ms-auto mt-1" onClick={() => addSingleLike(user.id)}>like</button>
                                )}
							</div>
						</div>
					</li>
				)}
			</ul>
		</div>
	);
};