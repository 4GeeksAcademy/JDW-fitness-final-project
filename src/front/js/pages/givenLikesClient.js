import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const GivenLikesClient = () => {
    const { store, actions } = useContext(Context);
    const loggedClient = JSON.parse(localStorage.getItem("loggedClient"));
    const [ coachID, setCoachID ] = useState(0)
    
    useEffect(() => {
        actions.getLikes()
        actions.getGivenLikes(loggedClient.id)
    },[])

    const deleteSingleLike = async (coachID) => {
            const existingLike = await store.likes.find((like) => like.source === "client" && like.coach_id === coachID && like.client_id === loggedClient.id);
            actions.deleteLike(existingLike.id, loggedClient.id);
    }

    return (
		<div className="container">
            <h1 className="text-center mt-3">Given Like List</h1>         
			<ul>
				{store.givenLikesClient.map((user, index) => 
					<li key={index} className="list-group-item my-2 border-3">
						<div className="d-flex flex-column justify-content-center">
                            <div className="d-flex">
                                <span className="fw-bold">Username: </span>
                                {user.username}
                                <button className="btn btn-danger py-0 px-1 ms-auto mt-1 fw-semibold" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={()=> setCoachID(user.id)}>Cancel your request</button>
                            </div>
						</div>
					</li>
				)}
			</ul>
            <div className="modal" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="deteleModalLabel">Are you sure to delete this?</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-dark" data-bs-dismiss="modal">Noooo!</button>
						<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>deleteSingleLike(coachID)}>Yes, of course!</button>
					</div>
					</div>
				</div>
			</div>
		</div>
	);
};