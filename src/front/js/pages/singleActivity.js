import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const SingleActivity = () => {
	const { store, actions } = useContext(Context);
    const {activityID} = useParams();

    useEffect(()=>{
    actions.getSingleActivityFrequency(activityID)
    },[])

	return (
		<div className="container mt-3">
            <h3 className="text-decoration-underline fst-italic">ActivityFrequency</h3>
            <ul className="my-3 fs-5">
                <li>
                    <span className="fw-bold">Mode: </span> 
                    {store.singleActivityFrequency.mode}
                </li>
            </ul>
            <Link to="/activities">
				<button className="btn btn-primary ms-3 fw-bold" onClick={actions.deleteSingleActivityFrequency}>Back to Goals list</button>
			</Link>
		</div>
	);
};