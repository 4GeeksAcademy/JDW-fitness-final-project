import React, { useState, useEffect, useContext } from "react";
import { Link,useNavigate, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const Goals = () => {
	const { store, actions } = useContext(Context);

    useEffect(()=>{
        actions.getGoals()
        },[])

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
                        <Link to={`/goals/update/${goal.id}`}>
                            <button onClick={()=>actions.updateGoal(goal.id)} className="btn btn-primary">Update</button>
                        </Link>
                    </div>
                    <div>
                        <span>Description:</span>
                        {goal.description}
                        <button onClick={()=>actions.deleteGoal(goal.id)} className="btn btn-danger">Delete</button>
                    </div>
                    <Link to={`/goals/${goal.id}`} className="ms-auto my-1">
						<button className="btn btn-info py-0 px-1 ms-auto">read more</button>					
					</Link>
                </li>
        
        )
            }
            </ul>
		</div>
	);
};
