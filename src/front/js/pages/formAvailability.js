import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const FormAvailability = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [day, setDay] = useState(store.availabilityToEdit?.day || "")
    const [hour, setHour] = useState(store.availabilityToEdit?.hour || "")
    const [errorMessage, setErrorMessage] = useState(false)

    function addAvailability(e) {
        e.preventDefault()
        if (day.trim() !== "" && hour.trim() !== "") {
			actions.addAvailabilityAPI(day, hour)
			setDay("")
			setHour("")
            navigate("/availability")
            setErrorMessage(false)
		}
        else {
            setErrorMessage(true)
        }
    }

    function updateAvailability(e) {
        e.preventDefault()
        if (day.trim() !== "" && hour.trim() !== "") {
			actions.updateAvailabilitytAPI(day, hour, store.availabilityToEdit.id)
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
            {!store.editing ? 
            <h3>Add availability</h3>
            :
            <h3>Update availability</h3>
            }
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
                {!store.editing ? 
                <button type="submit" className="btn btn-warning fw-bold" onClick={addAvailability}>Create</button>
                :
                <button type="submit" className="btn btn-warning fw-bold" onClick={updateAvailability}>Save changes</button>
                }
                <Link to="/availability">
				    <button className="btn btn-primary ms-3 fw-bold" >Back to Availability list</button>
			    </Link>
            </form>
		</div>
	);
};
