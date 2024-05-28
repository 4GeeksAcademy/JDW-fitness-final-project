import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const SingleCoach = () => {
	const { store, actions } = useContext(Context);
    const { coachID } = useParams();
    const [ education, setEducation ] = useState("")
    const [ experience, setExperience ] = useState("")

    
    useEffect(() => {
        actions.getSingleCoach(coachID);
        if (store.singleCoach.education_id) {
            actions.getSingleEducation(store.singleCoach.education_id);
        }
        if (store.singleCoach.experience_id) {
            actions.getSingleExperience(store.singleCoach.experience_id);
        }
    }, [store.singleCoach]);
    
    useEffect(() => {
        if (store.singleEducation && store.singleExperience) {
            setEducation(store.singleEducation.rank || "")
            setExperience(store.singleExperience.time || "")
        }
    }, [store.singleEducation, store.singleExperience]);
    
    const capitalizeFirstLetter = (string) => {
        if (typeof string !== 'string' || !string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

	return (
		<div className="container mt-3">
            <h3 className="mb-2">Coach: {capitalizeFirstLetter(store.singleCoach.username)}</h3>
            <h5>Some details about me:</h5>
            <ul className="my-3 fs-5">
                <li>
                    <span className="fw-bold">First name: </span> 
                    {capitalizeFirstLetter(store.singleCoach.first_name)}
                </li>
                <li>
                    <span className="fw-bold">Last name: </span> 
                    {capitalizeFirstLetter(store.singleCoach.last_name)}
                </li>
                <li>
                    <span className="fw-bold">Education: </span> 
                    {capitalizeFirstLetter(education)}
                </li>
                <li>
                    <span className="fw-bold">Experience: </span> 
                    {experience}
                </li>
            </ul>
            {/* <Link to={`/coach/update/${coach.id}`} className="ms-auto my-1">
					<button className="btn btn-secondary py-0 px-1 ms-auto" onClick={() => actions.updateEducation(prop.id)}>update</button>					
			</Link> */}
            <Link to="/coach">
				<button className="btn btn-primary ms-3 fw-bold" >Back to Coach list</button>
			</Link>
		</div>
	);
};
