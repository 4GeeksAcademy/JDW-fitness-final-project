import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const SingleAvailability = () => {
	const { store, actions } = useContext(Context);
    const params = useParams();

	return (
		<div className="container mt-3">
            <h3 className="text-decoration-underline fst-italic">Availability</h3>
            <ul className="my-3 fs-5">
                <li>
                    <span className="fw-bold">Day: </span> 
                    {store.singleAvailability.day}
                </li>
                <li>
                    <span className="fw-bold">Hour: </span> 
                    {store.singleAvailability.hour}
                </li>
            </ul>
            <Link to="/availability">
				<button className="btn btn-primary ms-3 fw-bold" onClick={actions.deleteSingleAvailability}>Back to Availability list</button>
			</Link>
		</div>
	);
};
