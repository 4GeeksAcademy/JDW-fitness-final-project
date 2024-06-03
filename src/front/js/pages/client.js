import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Client = () => {
	const { store, actions } = useContext(Context);
	const [ clientID, setClientID ] = useState(0) 
	const tokenCoach = localStorage.getItem("token_coach")
	const navigate = useNavigate();

	useEffect(() => {
        actions.getClients()
    },[]);

	// if(!tokenCoach) {
	// 	navigate("/coach/login")
	// }

	return (
		<div className="container">
			<div className="d-grid">
				<h1 className="text-center mt-3">Client List</h1>
				<Link to="/client/signup" className="ms-auto my-1">
					<button className="btn btn-warning fw-bold">Sign up</button>
				</Link>
			</div>
			<ul>
				{store.clients.map((client, index) => 
					<li key={index} className="list-group-item my-2 border-3">
						<div className="d-flex flex-column justify-content-center">
							<div className="d-flex">
								<span className="fw-bold">Username: </span>
								{client.username}
							</div>
							<div className="d-flex">
								<Link to={`/client/${client.id}`} className="mb-1">
									<button className="btn btn-info py-0 px-1 ms-auto">show more information</button>					
								</Link>
								<button className="btn btn-danger py-0 px-1 ms-auto mt-1" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={()=> setClientID(client.id)}>delete</button>
							</div>
							<button className="btn btn-secondary py-0 px-1 ms-auto">Like</button>	
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
						<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>actions.deleteClient(clientID)}>Yes, of course!</button>
					</div>
					</div>
				</div>
			</div>
		</div>
	);
};