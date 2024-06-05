import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Match = () => {
	const { store, actions } = useContext(Context);
	const [ matchID, setMatchID ] = useState(0)
	const loggedCoach = JSON.parse(localStorage.getItem("loggedCoach"));

	useEffect(() => {
        actions.getCoachMatches(loggedCoach.id)
    },[]);

	return (
		<div className="container">
			<h1 className="text-center mt-3">Match List</h1>
			<ul>
				{store.userMatches.map((user, index) => 
					<li key={index} className="list-group-item my-2 border-3">
						<div className="d-flex flex-column justify-content-center">
						<div className="d-flex">
							<span className="fw-bold">Username: </span>
							{user.username}
							<button className="btn btn-danger py-0 px-1 ms-auto mt-1" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={()=> setMatchID(user.id)}>delete match</button>
						</div>
						</div>
					</li>
				)}
			</ul>
			<div className="modal" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="deteleModalLabel">Are you sure to delete this?</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-dark" data-bs-dismiss="modal">No, I'm gonna think it better...</button>
						<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>actions.deleteMatch(matchID, loggedCoach.id)}>Yes, of course!</button>
					</div>
					</div>
				</div>
			</div>
		</div>
	);
};
