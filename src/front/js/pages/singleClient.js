import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { MapComponent } from "../component/mapComponent";
import ProfileImage from "../component/profileImage"

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
                <div className="container d-flex justify-content-center mt-4">
                    <div className="card p-4 mb-5 shadow-lg" style={{ borderRadius: "15px" }}>
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="d-flex flex-column flex-lg-row align-items-center">
                                <ProfileImage 
                                    photoUrl={store.singleClient.client_photo_url} 
                                    className="img-fluid rounded mb-4 mb-lg-0" 
                                    style={{ width: "280px", height: "300px", objectFit: "contain", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }} 
                                />
                                    <div className="ms-lg-4 w-100">
                                        <h3 className="mb-3">Client: {store.singleClient.username}</h3>
                                        <h5 className="mb-4">Some details about me:</h5>
                                        <ul className="list-group list-group-flush fs-6">
                                            <li className="list-group-item">
                                                <span className="fw-bold">First name: </span> 
                                                {store.singleClient.first_name}
                                            </li>
                                            <li className="list-group-item">
                                                <span className="fw-bold">Last name: </span> 
                                                {store.singleClient.last_name}
                                            </li>
                                            <li className="list-group-item">
                                                <span className="fw-bold">Age: </span> 
                                                {store.singleClient.age}
                                            </li>
                                            <li className="list-group-item">
                                                <span className="fw-bold">Height: </span> 
                                                {store.singleClient.height}
                                            </li>
                                            <li className="list-group-item">
                                                <span className="fw-bold">Weight: </span> 
                                                {store.singleClient.weight}
                                            </li>
                                            <li className="list-group-item">
                                                <span className="fw-bold">Gender: </span> 
                                                {store.singleClient.gender}
                                            </li>
                                            <li className="list-group-item">
                                                <span className="fw-bold">Physical Habits: </span> 
                                                {store.singleClient.physical_habits}
                                            </li>
                                            <li className="list-group-item">
                                                <span className="fw-bold">Activity Frequency: </span> 
                                                {activityFrequency}
                                            </li>
                                            {store.singleClient.city && 
                                            <li className="list-group-item">
                                                <span className="fw-bold">City: </span> 
                                                {store.singleClient.city}
                                            </li>
                                            }  
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {store.singleClient.latitude && store.singleClient.longitude && (
                                <div className="col-lg-4 d-flex align-items-center">
                                    <MapComponent 
                                        lat={store.singleClient.latitude}
                                        lng={store.singleClient.longitude} 
                                        style={{ height: "300px", width: "100%", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="mt-3 d-flex justify-content-end">
                            {(loggedClient && store.singleClient.id === loggedClient.id) &&            
                            <Link to={`/client/update/${clientID}`} className="ms-1">
                                    <button className="btn btn-secondary ms-auto fw-bold" >Update</button>					
                            </Link>
                            }
                            {loggedClient ?                
                            <Link to="/coach">
                                <button className="btn btn-primary ms-3 fw-bold" >Back to Coach list</button>
                            </Link>
                            :
                            <Link to="/client">
                                <button className="btn btn-primary ms-3 fw-bold" >Back to Client list</button>
                            </Link>
                            }
                            <Link to={`/availability-client/${clientID}`} className="ms-3">
                                <button className="btn btn-secondary ms-auto fw-bold" >Availability</button>					
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};    