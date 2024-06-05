import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Match = () => {
    const { store, actions } = useContext(Context);
    const [showEmails, setShowEmails] = useState({});
    const loggedCoach = JSON.parse(localStorage.getItem("loggedCoach"));

    useEffect(() => {
        actions.getUserMatches(loggedCoach.id);
    }, []);

    const toggleShowEmail = (userId) => {
        setShowEmails((prevShowEmails) => ({
            ...prevShowEmails,
            [userId]: !prevShowEmails[userId],
        }));
    };

    return (
        <div className="container">
            <h1 className="text-center mt-3">Match List</h1>
            <ul>
                {store.matchesCoach.map((user, index) => (
                    <li key={index} className="list-group-item my-2 border-3">
                        <div className="d-flex flex-column justify-content-center">
                            <div className="d-flex">
                                <span className="fw-bold">Username: </span>
                                {user.username}
                                <button className="btn btn-success py-0 px-1 ms-auto mt-1" onClick={() => toggleShowEmail(user.id)}>
                                    {showEmails[user.id] ? "hide email" : "show email"}
                                </button>
                                {showEmails[user.id] && (
                                    <>
                                        <span className="fw-bold ms-2">Email to contact: </span>
                                        {user.email}
                                    </>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
