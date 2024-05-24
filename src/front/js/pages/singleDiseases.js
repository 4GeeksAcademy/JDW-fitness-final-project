import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const SingleDiseases = () => {
	const { store, actions } = useContext(Context);
    const { diseasesID } = useParams();

    useEffect(() => {
        actions.getSingleDiseases(diseasesID)
    },[]);

	return (
		<div className="container mt-3">
            <h3 className="text-decoration-underline fst-italic">Diseases</h3>
            <ul className="my-3 fs-5">
                <li>
                    <span className="fw-bold">Kind: </span> 
                    {store.singleDiseases.kind}
                </li>
                <li>
                    <span className="fw-bold">sintoms: </span> 
                    {store.singleDiseases.sintoms}
                </li>
            </ul>
            <Link to="/diseases">
				<button className="btn btn-primary ms-3 fw-bold" onClick={actions.deleteSingleDisease}>Back to Availability list</button>
			</Link>
		</div>
	);
};