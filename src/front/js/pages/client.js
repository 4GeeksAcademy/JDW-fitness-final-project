import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ProfileImage from "../component/profileImage";
import { Context } from "../store/appContext";

export const Client = () => {
    const { store, actions } = useContext(Context);
    const loggedCoach = JSON.parse(localStorage.getItem("loggedCoach"));
    const [like, setLike] = useState({});
    const [match, setMatch] = useState({});
    const [ loading, setLoading ] = useState(true);
    const [pending, setPending] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await actions.getClients();
            await actions.getLikes();
            await actions.getMatches();
			setLoading(false);
		};
		fetchData();
    }, []);

    useEffect(() => {
        const likeStatus = {};
        store.clients.forEach((client) => {
            const existingLike = store.likes.find(
                (like) => like.source === "coach" && like.client_id === client.id && like.coach_id === loggedCoach.id
            );
            likeStatus[client.id] = !!existingLike;
        });
        setLike(likeStatus);
    }, [store.likes, store.clients]);

    useEffect(() => {
        const matchStatus = {};
        store.clients.forEach((client) => {
            const existingMatch = store.matches.find(
                (match) =>
                    (match.client_id === client.id && match.coach_id === loggedCoach.id)
            );
            matchStatus[client.id] = !!existingMatch;
        });
        setMatch(matchStatus);
    }, [store.matches, store.clients, store.likes]);

    useEffect(() => {
        const pendingStatus = {};
        store.clients.forEach((client) => {
            const clientLiked = store.likes.find(
                (like) => like.source === "client" && like.client_id === client.id && like.coach_id === loggedCoach.id
            );
            const coachLiked = store.likes.find(
                (like) => like.source === "coach" && like.client_id === client.id && like.coach_id === loggedCoach.id
            );
            pendingStatus[client.id] = clientLiked || coachLiked;
        });
        setPending(pendingStatus);
    }, [store.likes, store.clients, store.matches]);

    const handleLike = async (userID) => {
        try {
            const existingLike = store.likes.find(
                (like) => like.source === "coach" && like.client_id === userID && like.coach_id === loggedCoach.id
            );
            if (existingLike) {
                await actions.deleteLike(existingLike.id, loggedCoach.id);
            } else {
                await actions.addLikeAPI("coach", userID, loggedCoach.id);
            }

            // Refresh states
            await actions.getLikes();
            await actions.getMatches();
        } catch (error) {
            console.log("An error occurred with like or dislike function", error);
        }
    };

    return (
        <>
        {loading ? 
            <span className="loader"></span>
            :
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header-list mb-5">
                            <i className="fa-solid fa-users fs-3 text-secondary me-2"></i>
                            <h4 className="card-title">Client List</h4>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-responsive-md">
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Additional Info</th>
                                            <th>Status</th>
                                            <th className="ps-5">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {store.clients.map((client, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <ProfileImage
                                                            photoUrl={client.client_photo_url}
                                                            sizeClass="user-profile-image"
                                                        />
                                                        <span className="ms-3">{client.username}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/client/${client.id}`}
                                                        className="btn btn-card rounded-5"
                                                    >
                                                        <span>Show more</span>
                                                    </Link>
                                                </td>
                                                <td className="pe-5">
                                                    <div className="d-flex align-items-center">
                                                        {!match[client.id] && pending[client.id] && (
                                                            <span className="badge light badge-warning">Pending</span>
                                                        )}
                                                        {match[client.id] && (
                                                            <span className="badge light badge-success">Successful</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="ps-5">
                                                    <div className="d-flex">
                                                        {like[client.id] ? (
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark fw-semibold"
                                                                onClick={() => handleLike(client.id)}
                                                            >
                                                                Cancel request
                                                                <span className="btn-icon-right ms-3">
                                                                    <i className="fas fa-times"></i>
                                                                </span>
                                                            </button>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                className="btn btn-secondary btn-request fw-semibold"
                                                                onClick={() => handleLike(client.id)}
                                                            >
                                                                Request to train
                                                                <span className="btn-icon-right ms-3">
                                                                    <i className="fa fa-envelope"></i>
                                                                </span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                    }
        </>
    );
};
