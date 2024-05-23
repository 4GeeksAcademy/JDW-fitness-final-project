import React, { useState, useEffect, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Goals = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    useEffect(() => {
		actions.setEditing(false);
	}, [])

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
                        <Link to="/goals/form">
                            <button onClick={()=>actions.updateGoal(goal.id)} className="btn btn-primary">Update</button>
                        </Link>
                    </div>
                    <div>
                        <span>Description:</span>
                        {goal.description}
                        <button onClick={()=>actions.deleteGoal(goal.id)} className="btn btn-danger">Delete</button>
                    </div>
                </li>
        
        )
            }
            </ul>
		</div>
	);
};
