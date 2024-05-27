import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const UpdateEducation = () => {
	const { store, actions } = useContext(Context);
    const [rank, setRank] = useState("")
    const [errorMessage, setErrorMessage] = useState(false)
    const navigate = useNavigate();
    const { educationID } = useParams();

    useEffect(() => {
        actions.getSingleEducation(educationID);
    }, [educationID, actions]);

    useEffect(() => {
        if (store.singleEducation && !rank) {
            setRank(store.singleEducation.rank || "");
        }
    }, [store.singleEducation]);

    function updateEducation(e) {
        e.preventDefault()
        if (rank.trim() !== "") {
			actions.updateEducationAPI(rank, store.singleEducation.id)
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
            <h3>Update education</h3>
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
                <button type="submit" className="btn btn-warning fw-bold" onClick={updateEducation}>Save changes</button>
                <Link to="/education">
				    <button className="btn btn-primary ms-3 fw-bold" >Back to Education list</button>
			    </Link>
            </form>
		</div>
	);
};
