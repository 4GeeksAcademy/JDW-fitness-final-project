import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const SingleClient = () => {
	const { store, actions } = useContext(Context);
    const { clientID } = useParams();
    const [ activityFrequency, setActivityFrequency ] = useState("")

    
    useEffect(() => {
        actions.getSingleClient(clientID);
        if (store.singleClient.activity_frequency_id) {
            actions.getSingleActivityFrequency(store.singleClient.activity_frequency_id);
        }
    }, [store.singleClient]);
    
    useEffect(() => {
        if (store.singleActivityFrequency) {
            setActivityFrequency(store.singleActivityFrequency.mode || "")
        }
    }, [store.singleActivityFrequency]);
    
    const capitalizeFirstLetter = (string) => {
        if (typeof string !== 'string' || !string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

	return (
		<div className="container mt-3">
            <h3 className="mb-2">Client: {capitalizeFirstLetter(store.singleClient.username)}</h3>
            <h5>Some details about me:</h5>
            <ul className="my-3 fs-5">
                <li>
                    <span className="fw-bold">First name: </span> 
                    {capitalizeFirstLetter(store.singleClient.first_name)}
                </li>
                <li>
                    <span className="fw-bold">Last name: </span> 
                    {capitalizeFirstLetter(store.singleClient.last_name)}
                </li>
                <li>
                    <span className="fw-bold">Activity Frequency: </span> 
                    {capitalizeFirstLetter(activityFrequency)}
                </li>
            </ul>
            {/* <Link to={`/client/update/${client.id}`} className="ms-auto my-1">
					<button className="btn btn-secondary py-0 px-1 ms-auto" onClick={() => actions.updateEducation(prop.id)}>update</button>					
			</Link> */}
            <Link to="/client">
				<button className="btn btn-primary ms-3 fw-bold" >Back to Client list</button>
			</Link>
		</div>
	);
};