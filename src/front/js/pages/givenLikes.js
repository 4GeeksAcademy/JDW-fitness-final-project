import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const GivenLikes = () => {
	const { store, actions } = useContext(Context);
    const loggedCoach = JSON.parse(localStorage.getItem("loggedCoach"));

    useEffect(() => {
        if(loggedCoach) {
            actions.getGivenLikes("coach", loggedCoach.id)
        }
    },[])

    // const filterLikes = async () => {
    //     actions.getLikes()
    //     const filterLikesList = await store.likes.filter((like) => like.source === "coach" && like.coach_id === loggedCoach.id)
    //     setFilterList(filterLikesList)
    // }
    // filterLikes()

    const deleteSingleLike = (clientID) => {
        if(loggedCoach) {
            const existingLike = store.likes.find((like) => like.source === "coach" && like.client_id === clientID && like.coach_id === loggedCoach.id);
            actions.deleteLike(existingLike.id);
        }
    }

	return (
		<div className="container">
            <h1 className="text-center mt-3">Given Like List</h1>
			<ul>
				{store.givenLikes.map((like, index) => 
					<li key={index} className="list-group-item my-2 border-3">
						<div className="d-flex flex-column justify-content-center">
						<div className="d-flex">
							<span className="fw-bold">Username: </span>
							{like.username}
							<button className="btn btn-danger py-0 px-1 ms-auto mt-1" onClick={() => deleteSingleLike(like.id)}>delete</button>
						</div>
						</div>
					</li>
				)}
			</ul>
		</div>
	);
};