import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Availability = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div className="d-grid">
				<h1 className="text-center mt-3">Availability</h1>
				<Link to="/availability/form" className="ms-auto my-1">
					<button className="btn btn-warning fw-bold">Add a new one</button>
				</Link>
			</div>
			<ul>
				{store.availability.map((prop, index) => 
					<li key={index} className="list-group-item my-2 border-3">
						<div className="d-flex flex-column justify-content-center">
						<div className="d-flex">
							<span className="fw-bold">Day: </span>
							{prop.day}
							<button className="btn btn-secondary py-0 px-1 ms-auto">update</button>					
						</div>
						<div className="d-flex">
							<span className="fw-bold">Hour: </span>
							{prop.hour}
							<button className="btn btn-danger py-0 px-1 ms-auto mt-1">delete</button>
						</div>
						</div>
					</li>
				)}
			</ul>
		</div>
	);
};
