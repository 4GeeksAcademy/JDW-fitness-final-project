import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const AddDiseases= () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [kind, setKind] = useState("")
    const [sintoms, setSintoms] = useState("")
    const [errorMessage, setErrorMessage] = useState(false)

    function AddDiseases(e) {
        e.preventDefault()
        if (kind.trim() !== "" && sintoms.trim() !== "") {
			actions.createDisease(kind, sintoms)
			setKind("")
			setSintoms("")
            navigate("/diseases")
            setErrorMessage(false)
		}
        else {
            setErrorMessage(true)
        }
    }

	return (
		<div className="container mt-3">
            <h3>Add Diseases</h3>
            <form>
                <div className="mb-3 mt-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={kind} 
                    onChange={(e) => setKind(e.target.value)} 
                    placeholder="Kind"
                    />
                </div>
                <div className="mb-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={sintoms} 
                    onChange={(e) => setSintoms(e.target.value)} 
                    placeholder="Sintoms"
                    />
                </div>
                {errorMessage &&                 
                <div className="alert alert-danger mt-4 py-2" role="alert">
                    All fields must be filled
                </div>
                }
                <button type="submit" className="btn btn-warning fw-bold" onClick={AddDiseases}>Create</button>
                <Link to="/diseases">
				    <button className="btn btn-primary ms-3 fw-bold" >Back to Diseases list</button>
			    </Link>
            </form>
		</div>
	);
};