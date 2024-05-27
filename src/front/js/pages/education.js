import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Education = () => {
	const { store, actions } = useContext(Context);
	let educationID = 0  

	useEffect(() => {
        actions.getEducation()
    },[]);

	return (
		<div className="container">
			<div className="d-grid">
				<h1 className="text-center mt-3">Education</h1>
				<Link to="/education/add" className="ms-auto my-1">
					<button className="btn btn-warning fw-bold">Add a new one</button>
				</Link>
			</div>
			<ul>
				{store.education.map((prop, index) => 
					<li key={index} className="list-group-item my-2 border-3">
						<div className="d-flex flex-column justify-content-center">
						<div className="d-flex">
							<span className="fw-bold">Rank: </span>
							{prop.rank}
							<Link to={`/education/update/${prop.id}`} className="ms-auto my-1">
								<button className="btn btn-secondary py-0 px-1 ms-auto" onClick={() => actions.updateEducation(prop.id)}>update</button>					
							</Link>
						</div>
						<div className="d-flex">
							<Link to={`/education/${prop.id}`} className="mb-1">
								<button className="btn btn-info py-0 px-1 ms-auto">show more</button>					
							</Link>
							<button className="btn btn-danger py-0 px-1 ms-auto mt-1" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={()=> educationID = prop.id}>delete</button>
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
						<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>actions.deleteEducation(educationID)}>Yes, of course!</button>
					</div>
					</div>
				</div>
			</div>
		</div>
	);
};
