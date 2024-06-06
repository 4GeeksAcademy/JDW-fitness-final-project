import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Coach = () => {
	const { store, actions } = useContext(Context);
	const loggedClient = JSON.parse(localStorage.getItem("loggedClient"));
	const [like, setLike ] = useState({})

	useEffect(() => {
        actions.getCoaches()
		actions.getLikes()
    },[]);

	useEffect(() => {
        const likeStatus = {};
        store.coaches.forEach((coach) => {
            const existingLike = store.likes.find((like) => like.source === "client" && like.coach_id === coach.id && like.client_id === loggedClient.id);
            likeStatus[coach.id] = !existingLike;
        });
        setLike(likeStatus);
    }, [store.likes, store.coaches]);

	const handleLike= async (userID) => {
		try {
			const existingLike = await store.likes.find((like) => like.source === "client" && like.coach_id === userID && like.client_id === loggedClient.id);
			if(existingLike) {
				actions.deleteLike(existingLike.id, loggedClient.id);
			} 
			else {
				actions.addLikeAPI("client",loggedClient.id,userID);
			}	
			setLike((prevLike) => ({
				...prevLike,
				[userID]: !prevLike[userID],
			}));
		} catch (error) {
			console.log("An error ocurred with like or dislike function", error);
		}
    }

	return (
		<div className="container">
            <h1 className="text-center mt-3">Coach List</h1>
			<ul>
				{store.coaches.map((coach, index) => 
					<div key={index} className="">
						<li className="list-group-item my-2 border-3">
							<div className="d-flex justify-content-between">
								<div>
								<span className="fw-bold">Username: </span>
								{coach.username}
								</div>
								{like[coach.id] ?
								<button className="btn btn-warning py-0 px-1 fw-semibold" onClick={() => handleLike(coach.id)}>
									 Request to train
								</button>
								:	
								<button className="btn btn-danger py-0 px-1 fw-semibold" onClick={() => handleLike(coach.id)}>
									Cancel your request
								</button>					
								}
							</div>
							<Link to={`/coach/${coach.id}`} className="btn btn-info mt-2 fw-bold">
                    			<span>Show more information</span>
                			</Link>
						</li>
					</div>
				)}
			</ul>
		</div>		
	);
};