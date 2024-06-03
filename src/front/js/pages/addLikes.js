import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const AddLike = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [coachID, setCoachID] = useState(0)
    const [clientID, setClientID] = useState(0)    
    const [handleButton, setHandleButton] = useState(false)

    useEffect(() => {
        if (!store.error && handleButton) {
            navigate("/likes");
        }
    },[store.error, handleButton])

    function addLike(e) {
        e.preventDefault();
        actions.addLikeAPI(coachID, clientID);
        setHandleButton(true)
    };

	return (
		<div className="container mt-3">
            <h3>Add Like</h3>
            <form>
                <div className="mb-3 mt-3">
                    <input 
                    type="number" 
                    className="form-control" 
                    onChange={(e) => setCoachID(e.target.value)} 
                    placeholder="Coach ID"
                    />
                </div>
                <div className="mb-3">
                    <input 
                    type="number" 
                    className="form-control" 
                    onChange={(e) => setClientID(e.target.value)} 
                    placeholder="Client ID"
                    />
                </div>
                {store.error &&                 
                <div className="alert alert-danger mt-4 py-2 d-flex justify-content-center col-6 offset-3" role="alert">
                    {store.error}
                </div>
                }
                <button type="submit" className="btn btn-warning fw-bold" onClick={addLike}>Send your Like</button>
                <Link to="/likes">
				    <button className="btn btn-primary ms-3 fw-bold" >Back to Like list</button>
			    </Link>
            </form>
		</div>
	);
};