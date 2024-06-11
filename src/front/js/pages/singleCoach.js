import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { MapComponent } from "../component/mapComponent";
import ProfileImage from "../component/profileImage"

import { Context } from "../store/appContext";

export const SingleCoach = () => {
	const { store, actions } = useContext(Context);
    const [ education, setEducation ] = useState("")
    const [ experience, setExperience ] = useState("")
    const [ loading, setLoading ] = useState(true);
    const { coachID } = useParams();
    const loggedCoach = JSON.parse(localStorage.getItem("loggedCoach"));

    
    useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			await actions.getSingleCoach(coachID);
			if (store.singleCoach.education) {
				await actions.getSingleEducation(store.singleCoach.education_id);
			}
            if (store.singleCoach.experience) {
				await actions.getSingleExperience(store.singleCoach.experience_id);
			}
			setLoading(false);
		};
		fetchData();
	}, [coachID]);

    useEffect(() => {
        if (store.singleCoach) {
            if (store.singleCoach.education_id) actions.getSingleEducation(store.singleCoach.education_id);
            else setEducation("");

            if (store.singleCoach.experience_id) actions.getSingleExperience(store.singleCoach.experience_id);
            else  setExperience("");
        }
    }, [store.singleCoach]);

    useEffect(() => {
        if (store.singleCoach.education_id) setEducation(store.singleEducation.rank);
    }, [store.singleEducation]);

    useEffect(() => {
        if (store.singleCoach.experience_id) setExperience(store.singleExperience.time);
    }, [store.singleExperience]);

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
                                        photoUrl={store.singleCoach.coach_photo_url} 
                                        className="img-fluid rounded mb-4 mb-lg-0" 
                                        style={{ width: "280px", height: "300px", objectFit: "contain", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }} 
                                    />
                                    <div className="ms-lg-4 w-100">
                                        <h3 className="mb-3">Coach: {store.singleCoach.username}</h3>
                                        <h5 className="mb-4">Some details about me:</h5>
                                        <ul className="list-group list-group-flush fs-6">
                                            <li className="list-group-item">
                                                <span className="fw-bold">First name: </span> 
                                                {store.singleCoach.first_name}
                                            </li>
                                            <li className="list-group-item">
                                                <span className="fw-bold">Last name: </span> 
                                                {store.singleCoach.last_name}
                                            </li>
                                            <li className="list-group-item">
                                                <span className="fw-bold">Education: </span> 
                                                {education}
                                            </li>
                                            <li className="list-group-item">
                                                <span className="fw-bold">Experience: </span> 
                                                {experience}
                                            </li>
                                            {store.singleCoach.city && 
                                            <li className="list-group-item">
                                                <span className="fw-bold">City: </span> 
                                                {store.singleCoach.city}
                                            </li>
                                            }  
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {store.singleCoach.latitude && store.singleCoach.longitude && (
                                <div className="col-lg-4 d-flex align-items-center">
                                    <MapComponent 
                                        lat={store.singleCoach.latitude}
                                        lng={store.singleCoach.longitude} 
                                        style={{ height: "300px", width: "100%", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="mt-3 d-flex justify-content-end">
                            {(loggedCoach && store.singleCoach.id === loggedCoach.id) &&            
                            <Link to={`/coach/update/${coachID}`} className="ms-1">
                                    <button className="btn btn-secondary ms-auto fw-bold" >Update</button>					
                            </Link>
                            }
                            {loggedCoach ?                
                            <Link to="/client">
                                <button className="btn btn-primary ms-3 fw-bold" >Back to Client list</button>
                            </Link>
                            :
                            <Link to="/coach">
                                <button className="btn btn-primary ms-3 fw-bold" >Back to Coach list</button>
                            </Link>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    );
};    