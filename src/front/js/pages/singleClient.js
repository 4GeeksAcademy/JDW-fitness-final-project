import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const SingleClient = () => {
	const { store, actions } = useContext(Context);
    const { clientID } = useParams();
    const [loading, setLoading] = useState(true);
    const [ activityFrequency, setActivityFrequency ] = useState("")
    const loggedClient = JSON.parse(localStorage.getItem("loggedClient"));
    
    useEffect(() => {
		const fetchData = async () => {
			setLoading(true); 
			await actions.getSingleClient(clientID);
			if (store.singleClient.activity_frequency_id) {
				await actions.getSingleActivityFrequency(store.singleClient.activity_frequency_id);
			}
			setLoading(false);
		};
		fetchData();
	}, [clientID]);

    useEffect(() => {
        if (store.singleClient) {
            if (store.singleClient.activity_frequency_id) actions.getSingleActivityFrequency(store.singleClient.activity_frequency_id);
            else setActivityFrequency("");
        }
    }, [store.singleClient]);

    useEffect(() => {
        if (store.singleClient.activity_frequency_id) setActivityFrequency(store.singleActivityFrequency.mode);
    }, [store.singleActivityFrequency]);

	return (
        <>
        {loading ? 
            <h2 className="container mt-3">Loading...</h2>
            :
            <div className="container mt-3">
                <h3 className="mb-2">Client: { (store.singleClient.username)}</h3>
                <h5>Some details about me:</h5>
                <ul className="my-3 fs-5">
                    <li>
                        <span className="fw-bold">First name: </span> 
                        {(store.singleClient.first_name)}
                    </li>
                    <li>
                        <span className="fw-bold">Last name: </span> 
                        {(store.singleClient.last_name)}
                    </li>
                    <li>
                        <span className="fw-bold">Age: </span> 
                        {(store.singleClient.age)}
                    </li>
                    <li>
                        <span className="fw-bold">Height: </span> 
                        {(store.singleClient.height)}
                    </li>
                    <li>
                        <span className="fw-bold">Weight: </span> 
                        {(store.singleClient.weight)}
                    </li>
                    <li>
                        <span className="fw-bold">Gender: </span> 
                        {(store.singleClient.gender)}
                    </li>
                    <li>
                        <span className="fw-bold">Physical Habits: </span> 
                        {(store.singleClient.physical_habits)}
                    </li>
                    <li>
                        <span className="fw-bold">Activity Frequency: </span> 
                        {(activityFrequency)}
                    </li>  
                </ul>
                {(loggedClient && store.singleClient.id === loggedClient.id) &&            
                <Link to={`/client/update/${clientID}`} className="ms-auto my-1">
                        <button className="btn btn-secondary py-0 px-1 ms-auto" >Update</button>					
                </Link>
                }
                <Link to="/client">
                    <button className="btn btn-primary ms-3 fw-bold" >Back to Client list</button>
                </Link>
            </div>
        }
        </>
	);
};