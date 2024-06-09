import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { MapComponent } from "../component/mapComponent";

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
            <div className="container mt-3">
                <h3 className="mb-2">Coach: {store.singleCoach.username}</h3>
                <h5>Some details about me:</h5>
                <div className="">
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
                        {store.singleCoach.city && 
                        <li>
                            <span className="fw-bold">City: </span> 
                            {store.singleCoach.city}
                        </li>
                        }
                    </ul>
                    {(store.singleCoach.latitude && store.singleCoach.longitude) &&                 
                    <div className="">
                        <MapComponent 
                            lat = {store.singleCoach.latitude}
                            lng = {store.singleCoach.longitude} 
                        />
                    </div>
                    }
                </div>
                <div className="mt-3">
                    {(loggedCoach && store.singleCoach.id === loggedCoach.id) &&            
                    <Link to={`/coach/update/${coachID}`} className="ms-auto my-1">
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
        }
        </>
	);
};
