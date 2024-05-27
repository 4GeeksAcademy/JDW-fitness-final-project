import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const UpdateActivity = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const [mode, setMode] = useState("");
    const { activityID } = useParams();

    useEffect(() => {
        actions.getSingleActivityFrequency(activityID);
    }, []);

    useEffect(() => {
        if (store.singleActivityFrequency && !mode) {
            setMode(store.singleActivityFrequency.mode || "");
        }
    }, [store.singleActivityFrequency]);

    const updateActivityFrequency = (e) => {
        e.preventDefault() 
        if (mode.trim() !== "") {
          actions.updateActivityFrequencyAPI(mode,store.singleActivityFrequency.id)
          setMode("")
          navigate("/activities");
        }
      }

	return (
		<div className="container">
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Mode</label>
                    <input value={mode} onChange={(e)=>setMode(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <button onClick= {updateActivityFrequency} type="submit" className="btn btn-secondary">Save Modifications</button>
                </form>
		</div>
	);
};