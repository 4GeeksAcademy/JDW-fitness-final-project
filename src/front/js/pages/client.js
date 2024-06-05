import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Card } from "../component/card";

import { Context } from "../store/appContext";

export const Client = () => {
	const { store, actions } = useContext(Context);
	const loggedCoach = JSON.parse(localStorage.getItem("loggedCoach"));
	const [like, setLike ] = useState(false)

	useEffect(() => {
        actions.getClients()
		actions.getGivenLikes(loggedCoach.id)
    },[]);

	useEffect(() => {
        const existingLike = store.likes.some((like) => like.source === source && like.client_id === userID && like.coach_id === loggedCoach.id);
        if(existingLike) {
            setFavStar("fa-solid fa-star text-warning") 
        } else {
            setFavStar("fa-regular fa-star text-warning") 
        }
    },[store.likes])

	const handleLike= (userLike) => {
        const existingLike = store.likes.find((like) => like.source === source && like.client_id === userLike && like.coach_id === loggedCoach.id);
        if(existingLike) {
            actions.deleteLike(existingLike.id);
        } 
        else {
            actions.addLikeAPI(source, userLike, loggedCoach.id);

        }	
    }

	return (
		<div className="container">
            <h1 className="text-center mt-3">Client List</h1>
			<ul>
				{store.clients.map((client, index) => 
					<div key={index} className="col-12 col-md-6 col-xl-3 my-xl-2">
						<li className="list-group-item my-2 border-3">
						<div className="d-flex flex-column justify-content-center">
						<div className="d-flex">
							<span className="fw-bold">Username: </span>
							{client.username}
							<Link to={`/client/${client.id}`} className="btn btn-warning mt-2 fw-bold">
                    			<span>Show more information</span>
                			</Link>
							<button className="btn btn-secondary py-0 px-1 ms-auto" onClick={() => handleLike(client.id)}>
								{like[client.id] ? "hide email" : "show email"}
							</button>					
						</div>
						</div>
					</li>
					</div>
				)}
			</ul>
		</div>		
	);
};