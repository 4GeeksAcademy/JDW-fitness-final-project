import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const SingleEducation = () => {
	const { store, actions } = useContext(Context);
    const { educationID } = useParams();

    useEffect(() => {
        actions.getSingleEducation(educationID)
    },[]);
    
	return (
		<div className="container mt-3">
            <h3 className="text-decoration-underline fst-italic">Education</h3>
            <ul className="my-3 fs-5">
                <li>
                    <span className="fw-bold">Rank: </span> 
                    {store.singleEducation.rank}
                </li>
            </ul>
            <Link to="/education">
				<button className="btn btn-primary ms-3 fw-bold" >Back to Education list</button>
			</Link>
		</div>
	);
};
