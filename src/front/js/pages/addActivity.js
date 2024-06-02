import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddActivity = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const [mode, setMode] = useState("");
    const addActivity = (e) => {
        e.preventDefault()
        if (mode.trim() !== "") {
            actions.createActivityFrequency(mode)
            setMode("")
            navigate("/activities")
        }
    }

	return (
		<div className="container">
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Mode</label>
                    <input value={mode} onChange={(e)=>setMode(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <button onClick= {addActivity} type="submit" className="btn btn-primary">add</button>
                </form>
		</div>
	);
};