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
                <span className="loader"></span>
                :
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div class="col-xl-8 col-lg-10 col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Profile {store.singleCoach.username}</h4>
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
                                                    photoUrl={store.singleCoach.coach_photo_url}
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
                                                <td>Coach</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-semibold">First name:</td>
                                                <td>{store.singleCoach.first_name}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-semibold">Last name:</td>
                                                <td>{store.singleCoach.last_name}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-semibold">Education:</td>
                                                <td>{education}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-semibold">Experience:</td>
                                                <td>{experience}</td>
                                            </tr>
                                            {store.singleCoach.city && 
                                            <tr>
                                                <td className="fw-semibold">City:</td>
                                                <td>{store.singleCoach.city}</td>
                                            </tr>
                                            }  
                                        </tbody>
                                    </table>
                                </div>
                                            </div>
                                            <div id="v-pills-messages" className="tab-pane fade" role="tabpanel">
                                            {store.singleCoach.latitude && store.singleCoach.longitude && (
                                            <div className="">
                                            <MapComponent 
                                                lat={store.singleCoach.latitude}
                                                lng={store.singleCoach.longitude} 
                                            />
                                            </div>
                                            )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                            {(loggedCoach && store.singleCoach.id === loggedCoach.id) &&            
                                            <Link to={`/coach/update/${coachID}`} className="ms-1">
                                                    <button className="btn btn-secondary ms-auto fw-bold" >Update</button>					
                                            </Link>
                                            }
                                            {loggedCoach ?                
                                            <Link to="/client">
                                                <button className="btn btn-request ms-3 fw-bold" >Back to Client list</button>
                                            </Link>
                                            :
                                            <Link to="/coach">
                                                <button className="btn btn-request ms-3 fw-bold" >Back to Coach list</button>
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