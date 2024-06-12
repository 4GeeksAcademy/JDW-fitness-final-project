import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ProfileImage from "../component/profileImage"

import { Context } from "../store/appContext";

export const ReceivedLikesCoach = () => {
	const { store, actions } = useContext(Context);
    const loggedCoach = JSON.parse(localStorage.getItem("loggedCoach"));
	const [matchedClients, setMatchedClients] = useState([]);
	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
			await actions.getReceivedLikes(loggedCoach.id)
			await actions.getMatches()
			setLoading(false);
		};
		fetchData();
    }, []);

    useEffect(() => {
        // Actualizar la lista de clientes con match cuando store.matches cambie
        const coachMatches = store.matches.filter(match => match.coach_id === loggedCoach.id);
        const matchedClientIDs = coachMatches.map(match => match.client_id);
        setMatchedClients(matchedClientIDs);
    }, [store.matches, loggedCoach.id]);

	const addSingleLike = (clientID) => {
		actions.addLikeAPI("coach", clientID, loggedCoach.id);
		if (!matchedClients.includes(clientID)) {
            setMatchedClients([...matchedClients, clientID]);
        }
	}

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
					 	<i className="fa-regular fa-envelope fs-3 text-secondary me-2"></i>
						 <h4 className="card-title">Pending Requests</h4>
					 </div>
					 <div className="card-body px-4">
						 <div className="table-responsive">
							 <table className="table table-responsive-md">
								 <thead>
									 <tr>
										 <th>User</th>
										 <th>Additional Info</th>
										 <th></th>
										 <th className="ps-5">Action</th>
									 </tr>
								 </thead>
								 <tbody>
									 {store.receivedLikesCoach.map((user, index) => (
										 <tr key={index}>
											 <td>
												 <div className="d-flex align-items-center">
													 <ProfileImage
                                                            photoUrl={user.client_photo_url}
                                                            className="user-profile-image"
                                                            rounded
                                                        />
													 <span className="ms-3">{user.username}</span>
												 </div>
											 </td>
											 <td>
												 <Link
													 to={`/client/${user.id}`}
													 className="btn btn-card rounded-5"
												 >
													 <span>Show more</span>
												 </Link>
											 </td>
											 <td className="pe-5"></td>
											 <td className="ps-5">
											 {matchedClients.includes(user.id) ? (
									<div>
                                        <div className="alert alert-success left-icon-big alert-dismissible fade show text-center w-75">
                                            <div className="media">
                                                <div className="alert-left-icon-big">
                                                    <span><i className="mdi mdi-check-circle-outline"></i></span>
                                                </div>
                                                <div className="media-body">
                                                    <h5 className="mt-1 mb-2">Congratulations!</h5>
                                                    <p className="mb-0">Your client is ready to train with you <i className="fa-solid fa-hand-fist fs-4 ms-1"></i></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <button className="btn btn-secondary btn-request fw-semibold" onClick={() => addSingleLike(user.id)}>
										Accept request
										<span className="btn-icon-right ms-3"><i className="fa-regular fa-handshake"></i></span>
									</button>
                                )}
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