import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import helloThere from "/workspaces/JDW-fitness-final-project/src/front/img/obiwan.png";

import { Context } from "../store/appContext";

export const Card = ({ username, userID }) => {
	const { store, actions } = useContext(Context);
	const loggedCoach = JSON.parse(localStorage.getItem("loggedCoach"));
    const loggedClient = JSON.parse(localStorage.getItem("loggedClient"));
    const [path, setPath] = useState("")
    const [source, setSource] = useState("")
    const [favStar, setFavStar] = useState("")

	useEffect(() => {
		actions.getLikes()
    },[]);

    useEffect(() => {
        if(loggedClient) {
            setPath("coach")
            setSource("client")
        }
         else if (loggedCoach) {
            setPath("client")
            setSource("coach")
        }
    },[])
    
    const handleLike= (userLike) => {
        const existingLike = store.likes.find((like) => like.source === source && like.coach_id === userLike && like.client_id === loggedClient.id);
        if(existingLike) {
            actions.deleteLikeClient(existingLike.id);
        } 
        else {
            actions.addLikeAPI(source, userLike, loggedClient.id);
        }	
    }


    useEffect(() => {
        const existingLike = store.likes.some((like) => like.source === source && like.coach_id === userID && like.client_id === loggedClient.id);
        if(existingLike) {
            setFavStar("fa-solid fa-star text-warning") 
        } else {
            setFavStar("fa-regular fa-star text-warning") 
        }
    },[store.likes])

	return (   
        <div className="card border-0">
            <img src={helloThere} atl="hello there" className="card-img-top"/>
            <div className="card-body">
                <h5 className="card-title text-start text-white ms-1">Username: {username}</h5>
                <div className="card-text">
                </div>
                <div className="d-flex justify-content-between">
                <Link to={`/${path}/${userID}`} className="btn btn-warning mt-2 fw-bold">
                    <span>Show more information</span>
                </Link>
                <button onClick={()=> handleLike(userID)} className="border-0 fs-4 fav">
                    <i className={favStar}></i>
                </button>
                </div>
            </div>
        </div>
	);
};
					// <li key={index} className="list-group-item my-2 border-3">
					// 	<div className="d-flex flex-column justify-content-center">
					// 		<div className="d-flex">
					// 			<span className="fw-bold">Username: </span>
					// 			{client.username}
					// 		</div>
					// 		<div className="d-flex">
					// 			<Link to={`/client/${client.id}`} className="mb-1">
					// 				<button className="btn btn-info py-0 px-1 ms-auto"></button>					
					// 			</Link>
					// 			<button className="btn btn-danger py-0 px-1 ms-auto mt-1" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={()=> setClientID(client.id)}>delete</button>
					// 		</div>
					// 		<div>
					// 		<button className="btn btn-warning py-0 px-1 ms-auto mt-1" onClick={()=> handleLike(client.id)}>{dislike}</button>
					// 		</div>
					// 	</div>
					// </li>