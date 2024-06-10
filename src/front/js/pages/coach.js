import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ProfileImage from "../component/profileImage"

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
		<div className="row d-flex justify-content-center">
			<div className="col-10 col-xl-10">
				<div className="d-flex flex-row align-items-center card card-ui-default-1 bg-secondary p-4 col-12">
					<i className="fa-solid fa-dumbbell fs-2"></i>
					<h1 className="ms-3">Coach List</h1>
				</div>
			</div>
			{store.coaches.map((coach, index) => 
				<div key={index} className="col-10 col-xl-10">
					<div className="card card-ui-default-1 bg-secondary col-12">
						<div className="card-body mb-0 d-flex justify-content-between align-items-center">
							<div className="d-flex">
							<ProfileImage photoUrl={coach.coach_photo_url} sizeClass="client-profile-image" />
								<div className="d-flex flex-column justify-content-center ms-3">
									<h5 className="card-title mb-3">{coach.username}</h5>
									<Link to={`/coach/${coach.id}`} className="btn btn-card rounded-5">
										<span>Show more information</span>
									</Link>
								</div>
							</div>
							{like[coach.id] ?
								<button type="button" className="btn btn-secondary btn-request fw-semibold" onClick={() => handleLike(coach.id)}>Request to train<span className="btn-icon-right ms-3"><i className="fa fa-envelope"></i></span>
								</button>
								:   
								<button type="button" className="btn btn-dark fw-semibold" onClick={() => handleLike(coach.id)}>Cancel request<span className="btn-icon-right ms-3"><i className="fas fa-times"></i></span>
								</button>                
							}
						</div>
					</div>
				</div>
			)}
		</div>
	</div>      	
	);
};