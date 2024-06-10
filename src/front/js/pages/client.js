import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ProfileImage from "../component/profileImage"

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
            <div className="row d-flex justify-content-center">
                <div className="col-10 col-xl-10">
                    <div className="d-flex flex-row align-items-center card card-ui-default-1 bg-secondary p-4 col-12">
                        <i className="fa-solid fa-users fs-2"></i>
                        <h1 className="ms-3">Client List</h1>
                    </div>
                </div>
                {store.clients.map((client, index) => 
                    <div key={index} className="col-10 col-xl-10">
                        <div className="card card-ui-default-1 bg-secondary col-12">
                            <div className="card-body mb-0 d-flex justify-content-between align-items-center">
                                <div className="d-flex">
                                <ProfileImage photoUrl={client.client_photo_url} sizeClass="client-profile-image" />
                                    <div className="d-flex flex-column justify-content-center ms-3">
                                        <h5 className="card-title mb-3">{client.username}</h5>
                                        <Link to={`/client/${client.id}`} className="btn btn-card rounded-5">
                                            <span>Show more information</span>
                                        </Link>
                                    </div>
                                </div>
                                {like[client.id] ?
                                    <button type="button" className="btn btn-secondary btn-request fw-semibold" onClick={() => handleLike(client.id)}>Request to train<span className="btn-icon-right ms-3"><i className="fa fa-envelope"></i></span>
                                    </button>
                                    :   
                                    <button type="button" className="btn btn-secondary btn-cancel fw-semibold" onClick={() => handleLike(client.id)}>Cancel request<span className="btn-icon-right ms-3"><i className="fas fa-times"></i></span>
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
