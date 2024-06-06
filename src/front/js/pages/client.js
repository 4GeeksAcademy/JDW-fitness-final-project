import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Client = () => {
	const { store, actions } = useContext(Context);
	const loggedCoach = JSON.parse(localStorage.getItem("loggedCoach"));
	const [like, setLike ] = useState({})

	useEffect(() => {
        actions.getClients()
		actions.getLikes()
    },[]);

	useEffect(() => {
        const likeStatus = {};
        store.clients.forEach((client) => {
            const existingLike = store.likes.find((like) => like.source === "coach" && like.client_id === client.id && like.coach_id === loggedCoach.id);
            likeStatus[client.id] = !existingLike;
        });
        setLike(likeStatus);
    }, [store.likes, store.clients]);

	const handleLike= async (userID) => {
		try {
			const existingLike = await store.likes.find((like) => like.source === "coach" && like.client_id === userID && like.coach_id === loggedCoach.id);
			if(existingLike) {
				actions.deleteLike(existingLike.id, loggedCoach.id);
			} 
			else {
				actions.addLikeAPI("coach", userID, loggedCoach.id);
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
            <h1 className="text-center mt-3">Client List</h1>
			<ul>
				{store.clients.map((client, index) => 
					<div key={index} className="">
						<li className="list-group-item my-2 border-3">
							<div className="d-flex justify-content-between">
								<div>
								<span className="fw-bold">Username: </span>
								{client.username}
								</div>
								{like[client.id] ?
								<button className="btn btn-warning py-0 px-1 fw-semibold" onClick={() => handleLike(client.id)}>
									 Request to train
								</button>
								:	
								<button className="btn btn-danger py-0 px-1 fw-semibold" onClick={() => handleLike(client.id)}>
									Cancel your request
								</button>					
								}
							</div>
							<Link to={`/client/${client.id}`} className="btn btn-info mt-2 fw-bold">
                    			<span>Show more information</span>
                			</Link>
						</li>
					</div>
				)}
			</ul>
		</div>		
	);
};