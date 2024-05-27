import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const AddEducation = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [rank, setRank] = useState("")
    const [errorMessage, setErrorMessage] = useState(false)

    function addEducation(e) {
        e.preventDefault()
        if (rank.trim() !== "" ) {
			actions.addEducationAPI(rank)
			setRank("")
            navigate("/education")
            setErrorMessage(false)
		}
        else {
            setErrorMessage(true)
        }
    }

	return (
		<div className="container mt-3">
            <h3>Add education</h3>
            <form>
                <div className="mb-3 mt-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={rank} 
                    onChange={(e) => setRank(e.target.value)} 
                    placeholder="Rank"
                    />
                </div>
                {errorMessage &&                 
                <div className="alert alert-danger mt-4 py-2" role="alert">
                    The field must be filled
                </div>
                }
                <button type="submit" className="btn btn-warning fw-bold" onClick={addEducation}>Create</button>
                <Link to="/education">
				    <button className="btn btn-primary ms-3 fw-bold" >Back to Education list</button>
			    </Link>
            </form>
		</div>
	);
};
