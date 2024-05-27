import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const SingleExperience = () => {
	const { store, actions } = useContext(Context);
    const { experienceID } = useParams();

    useEffect(() => {
        actions.getSingleExperience(experienceID)
    },[]);
    
	return (
		<div className="container mt-3">
            <h3 className="text-decoration-underline fst-italic">Experience</h3>
            <ul className="my-3 fs-5">
                <li>
                    <span className="fw-bold">Time: </span> 
                    {store.singleExperience.time}
                </li>
            </ul>
            <Link to="/experience">
				<button className="btn btn-primary ms-3 fw-bold" >Back to Experience list</button>
			</Link>
		</div>
	);
};
