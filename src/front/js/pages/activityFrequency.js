import React, { useState, useEffect, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const ActivityFrequency = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate()

useEffect (()=>{
    actions.getActivityFrequency()
},[])

	return (
		<div className="container">
            <h1>Activities</h1>
            <Link to="/activities/form">
            <button className="btn btn-secondary">Add activity</button>
            </Link>
            <ul>
            {store.activities.map((activity,index)=>
                <li key={index}>
                    <div>
                        <span>Mode:</span>
                        {activity.mode}
                        <Link to={`/activities/update/${activity.id}`}>
                            <button onClick={()=>actions.updateActivityFrequency(activity.id)} className="btn btn-primary">Update</button>
                        </Link>
                        <button onClick={()=>actions.deleteActivityFrequency(activity.id)} className="btn btn-danger">Delete</button>
                    </div>
                    <Link to={`/activities/${activity.id}`} className="ms-auto my-1">
						<button className="btn btn-info py-0 px-1 ms-auto">read more</button>					
					</Link>
                </li>
        
        )
            }
            </ul>
		</div>
	);
};
