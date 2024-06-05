import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const GivenLikesClient = () => {
    const { store, actions } = useContext(Context);
    const loggedClient = JSON.parse(localStorage.getItem("loggedClient"));
    
    useEffect(() => {
        actions.getGivenLikes(loggedClient.id)
        actions.getLikes()
    },[])

    const deleteSingleLike = async (coachID) => {
            const existingLike = await store.likes.find((like) => like.source === "client" && like.coach_id === coachID && like.client_id === loggedClient.id);
            actions.deleteLike(existingLike.id, loggedClient.id);
    }

    return (
        <div className="container">
            <h1 className="text-center mt-3">Given Like List</h1>         
            <ul>
                {store.givenLikesClient.map((user, index) => 
                    <li key={index} className="list-group-item my-2 border-3">
                        <div className="d-flex flex-column justify-content-center">
                        <div className="d-flex">
                            <span className="fw-bold">Username: </span>
                            {user.username}
                            <button className="btn btn-danger py-0 px-1 ms-auto mt-1" onClick={() => deleteSingleLike(user.id)}>delete</button>
                        </div>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
};