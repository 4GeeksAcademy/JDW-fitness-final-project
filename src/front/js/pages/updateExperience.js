import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const UpdateExperience = () => {
	const { store, actions } = useContext(Context);
    const [time, setTime] = useState("")
    const [errorMessage, setErrorMessage] = useState(false)
    const navigate = useNavigate();
    const { experienceID } = useParams();

    useEffect(() => {
        actions.getSingleExperience(experienceID);
    }, []);

    useEffect(() => {
        if (store.singleExperience && !time) {
            setTime(store.singleExperience.time || "");
        }
    }, [store.singleExperience]);

    function updateExperience(e) {
        e.preventDefault()
        if (time.trim() !== "") {
			actions.updateExperienceAPI(time, store.singleExperience.id)
			setTime("")
            navigate("/experience")
            setErrorMessage(false)
		}
        else {
            setErrorMessage(true)
        }
    }

	return (
		<div className="container mt-3">
            <h3>Update experience</h3>
            <form>
                <div className="mb-3 mt-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)} 
                    placeholder="Time"
                    />
                </div>
                {errorMessage &&                 
                <div className="alert alert-danger mt-4 py-2" role="alert">
                    The field must be filled
                </div>
                }
                <button type="submit" className="btn btn-warning fw-bold" onClick={updateExperience}>Save changes</button>
                <Link to="/experience">
				    <button className="btn btn-primary ms-3 fw-bold" >Back to Experience list</button>
			    </Link>
            </form>
		</div>
	);
};
