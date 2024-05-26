import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const UpdateGoal = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const [kind, setKind] = useState(store.goalToUpdate?.kind||"");
    const [description, setDescription] = useState(store.goalToUpdate?.description||"");
// Consultar que hace el ? segun jorge lo que hace es esperar que carge

    const updateGoal = (e) => {
        e.preventDefault() 
        if (kind.trim() !== "" && description.trim() !== "") {
          actions.updateGoalAPI(kind, description,store.goalToUpdate.id)
          navigate("/goals");
        }
      }

	return (
		<div className="container">
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Kind</label>
                    <input value={kind} onChange={(e)=>setKind(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input value={description} onChange={(e)=>setDescription(e.target.value)} type="text" className="form-control" id="exampleInputPassword1"/>
                </div>

                <button onClick= {updateGoal} type="submit" className="btn btn-secondary">Save Modifications</button>
                </form>
		</div>
	);
};