import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { MapComponent } from "../component/mapComponent";
import ProfileImage from "../component/profileImage"
import { LoadScript } from "@react-google-maps/api";

const libraries = ["places"];


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
                <span className="loader"></span>
                :
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-10 col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Profile {store.singleClient.username}</h4>
                            </div>
                            <div className="card-body">
                                <div className="row p-4">
                                    <div className="col-xl-4 d-flex flex-column justify-content-between">
                                        <div className="nav flex-column nav-pills mb-3" role="tablist">
                                            <a href="#v-pills-home" data-bs-toggle="pill" className="nav-link show active" aria-selected="true" role="tab">Photo</a>
                                            <a href="#v-pills-profile" data-bs-toggle="pill" className="nav-link" aria-selected="false" role="tab" tabIndex="-1">More details</a>
                                            <a href="#v-pills-messages" data-bs-toggle="pill" className="nav-link" aria-selected="false" role="tab" tabIndex="-1">Location</a>
                                        </div>
                                    </div>
                                    <div className="col-xl-8">
                                        <div className="tab-content">
                                            <div id="v-pills-home" className="tab-pane fade active show" role="tabpanel">
                                                <div className="d-flex justify-content-center">
                                                <ProfileImage
                                                    photoUrl={store.singleClient.client_photo_url}
                                                        className="single-user-profile-image"
                                                />
                                                </div>
                                            </div>
                                            <div id="v-pills-profile" className="tab-pane fade" role="tabpanel">
                                            <div className="table-responsive">
                                    <table className="table table-responsive-md">
                                        <tbody>
                                            <tr>
                                                <td className="fw-semibold">Role:</td>
                                                <td>Client</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-semibold">First name:</td>
                                                <td>{store.singleClient.first_name}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-semibold">Last name:</td>
                                                <td>{store.singleClient.last_name}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-semibold">Activity frequency:</td>
                                                <td>{activityFrequency}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-semibold">Physical habits:</td>
                                                <td>{store.singleClient.physical_habits}</td>
                                            </tr>
                                            {store.singleClient.age && 
                                            <tr>
                                                <td className="fw-semibold">Age:</td>
                                                <td>{store.singleClient.age}</td>
                                            </tr>
                                            }
                                            {store.singleClient.gender && 
                                            <tr>
                                                <td className="fw-semibold">Gender:</td>
                                                <td>{store.singleClient.gender}</td>
                                            </tr>
                                            }
                                            {store.singleClient.bmi && 
                                            <tr>
                                                <td className="fw-semibold">BMI (Body Mass Index):</td>
                                                <td>{store.singleClient.bmi}</td>
                                            </tr>
                                            }    
                                            {store.singleClient.fat && 
                                            <tr>
                                                <td className="fw-semibold">Body fat percentage:</td>
                                                <td>{store.singleClient.fat} %</td>
                                            </tr>
                                            }
                                            {store.singleClient.bmr && 
                                            <tr>
                                                <td className="fw-semibold">BMR (Basal Metabolic Rate):</td>
                                                <td>{store.singleClient.bmr}</td>
                                            </tr>
                                            }        
                                            {store.singleClient.city && 
                                            <tr>
                                                <td className="fw-semibold">City:</td>
                                                <td>{store.singleClient.city}</td>
                                            </tr>
                                            }  
                                        </tbody>
                                    </table>
                                </div>
                                            </div>
                                            <div id="v-pills-messages" className="tab-pane fade" role="tabpanel">
                                            {store.singleClient.latitude && store.singleClient.longitude && (
                                                        <div className="">
                                                        <LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY} libraries={libraries}>
                                                            <MapComponent
                                                                lat={store.singleClient.latitude}
                                                                lng={store.singleClient.longitude}
                                                            />
                                                        </LoadScript>
                                                    </div>
                                            )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                            {(loggedClient && store.singleClient.id === loggedClient.id) &&            
                                            <Link to={`/client/update/${clientID}`} className="ms-1">
                                                    <button className="btn btn-secondary ms-auto fw-bold" >Update</button>					
                                            </Link>
                                            }
                                            {loggedClient ?                
                                            <Link to="/coach">
                                                <button className="btn btn-request ms-3 fw-bold" >Back to Coach list</button>
                                            </Link>
                                            :
                                            <Link to="/client">
                                                <button className="btn btn-request ms-3 fw-bold" >Back to Client list</button>
                                            </Link>
                                            }
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
            }
        </>
    );
};    