import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const SingleCoach = () => {
	const { store, actions } = useContext(Context);
    const [ education, setEducation ] = useState("")
    const [ experience, setExperience ] = useState("")
    const { coachID } = useParams();

    
    useEffect(() => {
        actions.getSingleCoach(coachID);
    }, [coachID]);

    useEffect(() => {
        if (store.singleCoach) {
            if (store.singleCoach.education_id) actions.getSingleEducation(store.singleCoach.education_id);
            else setEducation("");

            if (store.singleCoach.experience_id) actions.getSingleExperience(store.singleCoach.experience_id);
            else  setExperience("");
        }
    }, [store.singleCoach, actions]);

    useEffect(() => {
        if (store.singleCoach.education_id) setEducation(store.singleEducation.rank);
    }, [store.singleEducation]);

    useEffect(() => {
        if (store.singleCoach.experience_id) setExperience(store.singleExperience.time);
    }, [store.singleExperience]);

	return (
		<div className="container mt-3">
            <h3 className="mb-2">Coach: {store.singleCoach.username}</h3>
            <h5>Some details about me:</h5>
            <ul className="my-3 fs-5">
                <li>
                    <span className="fw-bold">First name: </span> 
                    {store.singleCoach.first_name}
                </li>
                <li>
                    <span className="fw-bold">Last name: </span> 
                    {store.singleCoach.last_name}
                </li>
                <li>
                    <span className="fw-bold">Education: </span> 
                    {education}
                </li>
                <li>
                    <span className="fw-bold">Experience: </span> 
                    {experience}
                </li>
            </ul>
            {store.errorCoach &&                 
                <div className="alert alert-danger mt-4 py-2 d-flex justify-content-center col-6 offset-3" role="alert">
                    {store.errorCoach}
                </div>
                }
            <Link to={`/coach/update/${coachID}`} className="ms-auto my-1">
					<button className="btn btn-secondary py-0 px-1 ms-auto" >Update</button>					
			</Link>
            <Link to="/client">
				<button className="btn btn-primary ms-3 fw-bold" >Back to Client list</button>
			</Link>
		</div>
	);
};
