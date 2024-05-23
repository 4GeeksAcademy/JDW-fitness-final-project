import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const FormAvailability = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [day, setDay] = useState("")
    const [hour, setHour] = useState("")

    function addAvailability(e) {
        e.preventDefault()
        if (day.trim() !== "" && hour.trim() !== "") {
			actions.addAvailabilityAPI(day, hour)
			setDay("")
			setHour("")
            navigate("/availability")
		}
    }

	return (
		<div className="container mt-3">
            <h3>Add availability</h3>
            <form>
                <div className="mb-3 mt-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={day} 
                    onChange={(e) => setDay(e.target.value)} 
                    placeholder="Day"
                    />
                </div>
                <div className="mb-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={hour} 
                    onChange={(e) => setHour(e.target.value)} 
                    placeholder="Hour"
                    />
                </div>
                <button type="submit" className="btn btn-warning fw-bold" onClick={addAvailability}>Create</button>
                <Link to="/availability">
				    <button className="btn btn-primary ms-3 fw-bold" >Back to Availability list</button>
			    </Link>
            </form>
		</div>
	);
};
