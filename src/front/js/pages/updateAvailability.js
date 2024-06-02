import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const UpdateAvailability = () => {
	const { store, actions } = useContext(Context);
    const [day, setDay] = useState("")
    const [hour, setHour] = useState("")
    const [errorMessage, setErrorMessage] = useState(false)
    const navigate = useNavigate();
    const { availabilityID } = useParams();

    useEffect(() => {
        actions.getSingleAvailability(availabilityID);
    }, []);

    useEffect(() => {
        if (store.singleAvailability && !day && !hour) {
            setDay(store.singleAvailability.day || "");
            setHour(store.singleAvailability.hour || "");
        }
    }, [store.singleAvailability]);

    function updateAvailability(e) {
        e.preventDefault()
        if (day.trim() !== "" && hour.trim() !== "") {
			actions.updateAvailabilityAPI(day, hour, store.singleAvailability.id)
			setDay("")
			setHour("")
            navigate("/availability")
            setErrorMessage(false)
		}
        else {
            setErrorMessage(true)
        }
    }

	return (
		<div className="container mt-3">
            <h3>Update availability</h3>
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
                {errorMessage &&                 
                <div className="alert alert-danger mt-4 py-2" role="alert">
                    All fields must be filled
                </div>
                }
                <button type="submit" className="btn btn-warning fw-bold" onClick={updateAvailability}>Save changes</button>
                <Link to="/availability">
				    <button className="btn btn-primary ms-3 fw-bold" >Back to Availability list</button>
			    </Link>
            </form>
		</div>
	);
};
