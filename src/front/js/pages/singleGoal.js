import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const SingleGoal = () => {
	const { store, actions } = useContext(Context);
    const {goalID} = useParams();

    useEffect(()=>{
    actions.getSingleGoal(goalID)
    },[])

	return (
		<div className="container mt-3">
            <h3 className="text-decoration-underline fst-italic">Goal</h3>
            <ul className="my-3 fs-5">
                <li>
                    <span className="fw-bold">Kind: </span> 
                    {store.singleGoal.kind}
                </li>
                <li>
                    <span className="fw-bold">Description: </span> 
                    {store.singleGoal.description}
                </li>
            </ul>
            <Link to="/goals">
				<button className="btn btn-primary ms-3 fw-bold" onClick={actions.deleteSingleGoal}>Back to Goals list</button>
			</Link>
		</div>
	);
};