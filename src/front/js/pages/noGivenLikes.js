import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const NoGivenLikesClient = () => {
    const { store, actions } = useContext(Context);
    const loggedClient = JSON.parse(localStorage.getItem("loggedClient"));

    useEffect(() => {
        actions.getNoGivenLikes(loggedClient.id)
    },[])

    const addSingleLike = (coachID) => {
            actions.addLikeAPI("client",loggedClient.id, coachID);
    }

    return (
        <div className="container">
            <h1 className="text-center mt-3">No Given Like List</h1>
            <ul>
                {store.noGivenLikesClient.map((user, index) => 
                    <li key={index} className="list-group-item my-2 border-3">
                        <div className="d-flex flex-column justify-content-center">
                            <div className="d-flex">
                                <span className="fw-bold">Username: </span>
                                {user.username}
                                <button className="btn btn-warning py-0 px-1 ms-auto mt-1" onClick={() => addSingleLike(user.id)}>like</button>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
};