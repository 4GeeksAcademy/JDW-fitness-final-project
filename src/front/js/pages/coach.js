import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ProfileImage from "../component/profileImage";
import { Context } from "../store/appContext";

export const Coach = () => {
    const { store, actions } = useContext(Context);
    const loggedClient = JSON.parse(localStorage.getItem("loggedClient"));
    const [like, setLike] = useState({});
    const [match, setMatch] = useState({});
    const [ loading, setLoading ] = useState(true);
    const [pending, setPending] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await actions.getCoaches();
            await actions.getLikes();
            await actions.getMatches();
			setLoading(false);
		};
		fetchData();
    }, []);

    useEffect(() => {
        const likeStatus = {};
        store.coaches.forEach((coach) => {
            const existingLike = store.likes.find(
                (like) => like.source === "client" && like.coach_id === coach.id && like.client_id === loggedClient.id
            );
            likeStatus[coach.id] = !!existingLike;
        });
        setLike(likeStatus);
    }, [store.likes, store.coaches]);

    useEffect(() => {
        const matchStatus = {};
        store.coaches.forEach((coach) => {
            const existingMatch = store.matches.find(
                (match) =>
                    (match.coach_id === coach.id && match.client_id === loggedClient.id)
            );
            matchStatus[coach.id] = !!existingMatch;
        });
        setMatch(matchStatus);
    }, [store.matches, store.coaches, store.likes]);

    useEffect(() => {
        const pendingStatus = {};
        store.coaches.forEach((coach) => {
            const clientLiked = store.likes.find(
                (like) => like.source === "client" && like.client_id === loggedClient.id && like.coach_id === coach.id
            );
            const coachLiked = store.likes.find(
                (like) => like.source === "coach" && like.client_id === loggedClient.id && like.coach_id === coach.id
            );
            pendingStatus[coach.id] = clientLiked || coachLiked;
        });
        setPending(pendingStatus);
    }, [store.likes, store.coaches, store.matches]);

    const handleLike = async (userID) => {
        try {
            const existingLike = store.likes.find(
                (like) => like.source === "client" && like.client_id === loggedClient.id && like.coach_id === userID
            );
            if (existingLike) {
                await actions.deleteLike(existingLike.id, loggedClient.id);
            } else {
                await actions.addLikeAPI("client", loggedClient.id, userID);
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
                            <h4 className="card-title">Coach List</h4>
                        </div>
                        <div className="card-body px-4">
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
                                        {store.coaches.map((coach, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <ProfileImage
                                                            photoUrl={coach.coach_photo_url}
                                                            className="user-profile-image"
                                                            rounded
                                                        />
                                                        <span className="ms-3">{coach.username}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/coach/${coach.id}`}
                                                        className="btn btn-card rounded-5"
                                                    >
                                                        <span>Show more</span>
                                                    </Link>
                                                </td>
                                                <td className="pe-5">
                                                    <div className="d-flex align-items-center">
                                                        {!match[coach.id] && pending[coach.id] && (
                                                            <span className="badge light badge-warning">Pending</span>
                                                        )}
                                                        {match[coach.id] && (
                                                            <span className="badge light badge-success">Ready to train</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="ps-5">
                                                    <div className="d-flex">
                                                        {like[coach.id] ? (
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark fw-semibold"
                                                                onClick={() => handleLike(coach.id)}
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
                                                                onClick={() => handleLike(coach.id)}
                                                            >
                                                                Request training
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
