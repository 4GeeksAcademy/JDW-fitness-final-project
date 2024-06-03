import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Likes = () => {
	const { store, actions } = useContext(Context);
	const [ likeID, setLikeID ] = useState(0)

	useEffect(() => {
        actions.getLikes()
    },[store.likes]);

	return (
		<div className="container">
			<div className="d-grid">
				<h1 className="text-center mt-3">Likes</h1>
				<Link to="/likes/signup" className="ms-auto my-1">
					<button className="btn btn-warning fw-bold">Add a new likes</button>
				</Link>
			</div>
			<ul>
				{store.likes.map((prop, index) => 
					<li key={index} className="list-group-item my-2 border-3">
						<div className="d-flex flex-column justify-content-center">
						<div className="d-flex">
							<span className="fw-bold">Coach ID: </span>
							{prop.coach_id}
						</div>
						<div className="d-flex">
							<span className="fw-bold">Client ID: </span>
							{prop.client_id}
							<button className="btn btn-danger py-0 px-1 ms-auto mt-1" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={()=> setLikeID(prop.id)}>delete</button>
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
						<button type="button" className="btn btn-dark" data-bs-dismiss="modal">Noooo!</button>
						<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>actions.deleteLike(likeID)}>Yes, of course!</button>
					</div>
					</div>
				</div>
			</div>
		</div>
	);
};