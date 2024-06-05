import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const ReceivedLikes = () => {
	const { store, actions } = useContext(Context);
    const loggedCoach = JSON.parse(localStorage.getItem("loggedCoach"));

    useEffect(() => {
        if(loggedCoach) {
            actions.getReceivedLikes("client", loggedCoach.id)
        }
    },[])

    // const filterLikes = async () => {
    //     actions.getLikes()
    //     const filterLikesList = await store.likes.filter((like) => like.source === "coach" && like.coach_id === loggedCoach.id)
    //     setFilterList(filterLikesList)
    // }
    // filterLikes()

	return (
		<div className="container">
			<h1 className="text-center mt-3">Received Like List</h1>
			<ul>
				{store.receivedLikes.map((like, index) => 
					<li key={index} className="list-group-item my-2 border-3">
						<div className="d-flex flex-column justify-content-center">
						<div className="d-flex">
							<span className="fw-bold">Username: </span>
							{like.username}
						</div>
						</div>
					</li>
				)}
			</ul>
		</div>
	);
};