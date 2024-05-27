import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const AddExperience = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [time, setTime] = useState("")
    const [errorMessage, setErrorMessage] = useState(false)

    function addExperience(e) {
        e.preventDefault()
        if (time.trim() !== "" ) {
			actions.addExperienceAPI(time)
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
            <h3>Add experience</h3>
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
                <button type="submit" className="btn btn-warning fw-bold" onClick={addExperience}>Create</button>
                <Link to="/experience">
				    <button className="btn btn-primary ms-3 fw-bold" >Back to Experience list</button>
			    </Link>
            </form>
		</div>
	);
};
