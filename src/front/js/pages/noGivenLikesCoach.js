import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const NoGivenLikesCoach = () => {
	const { store, actions } = useContext(Context);
    const loggedCoach = JSON.parse(localStorage.getItem("loggedCoach"));

    useEffect(() => {
        actions.getNoGivenLikes(loggedCoach.id)
    },[])

    const addSingleLike = (clientID) => {
        actions.addLikeAPI("coach", clientID, loggedCoach.id);
    }

	return (
		<div className="container">
            <h1 className="text-center mt-3">No Given Like List</h1>
			<ul>
				{store.noGivenLikesCoach.map((user, index) => 
					<li key={index} className="list-group-item my-2 border-3">
						<div className="d-flex flex-column justify-content-center">
                            <div className="d-flex">
                                <span className="fw-bold">Username: </span>
                                {user.username}
                                <button className="btn btn-warning py-0 px-1 ms-auto mt-1 fw-semibold" onClick={() => addSingleLike(user.id)}>Request to train</button>
                            </div>
						</div>
					</li>
				)}
			</ul>
		</div>
	);
};