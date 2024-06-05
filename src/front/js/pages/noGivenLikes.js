import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const NoGivenLikes = () => {
	const { store, actions } = useContext(Context);
    const loggedCoach = JSON.parse(localStorage.getItem("loggedCoach"));

    useEffect(() => {
        if(loggedCoach) {
            actions.getNoGivenLikes("coach", loggedCoach.id)
        }
    },[])

    // const filterLikes = async () => {
    //     actions.getLikes()
    //     const filterLikesList = await store.likes.filter((like) => like.source === "coach" && like.coach_id === loggedCoach.id)
    //     setFilterList(filterLikesList)
    // }
    // filterLikes()

    const addSingleLike = (clientID) => {
        if(loggedCoach) {
            actions.addLikeAPI("coach", clientID, loggedCoach.id);
        }
    }

	return (
		<div className="container">
            <h1 className="text-center mt-3">No Given Like List</h1>
			<ul>
				{store.noGivenLikes.map((like, index) => 
					<li key={index} className="list-group-item my-2 border-3">
						<div className="d-flex flex-column justify-content-center">
						<div className="d-flex">
							<span className="fw-bold">Username: </span>
							{like.username}
							<button className="btn btn-warning py-0 px-1 ms-auto mt-1" onClick={() => addSingleLike(like.id)}>like</button>
						</div>
						</div>
					</li>
				)}
			</ul>
		</div>
	);
};