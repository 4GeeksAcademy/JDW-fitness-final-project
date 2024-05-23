import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Goals = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
            <h1>Goals</h1>
            <Link to="/goals/form">
            <button className="btn btn-secondary">Add a goal</button>
            </Link>
            <ul>
            {store.goals.map((goal,index)=>
                <li key={index}>
                    <div>
                        <span>Kind:</span>
                        {goal.kind}
                        <button className="btn btn-primary">Update</button>
                    </div>
                    <div>
                        <span>Description:</span>
                        {goal.description}
                        <button onClick={actions.deleteGoal(goal.id)} className="btn btn-danger">Delete</button>
                    </div>
                </li>
        
        )
            }
            </ul>
		</div>
	);
};
