import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import ProfileImage from "../component/profileImage"

export const GivenLikesClient = () => {
	const { store, actions } = useContext(Context);
    const loggedClient = JSON.parse(localStorage.getItem("loggedClient"));
    const [ coachID, setCoachID ] = useState(0)
	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
			await actions.getGivenLikes(loggedClient.id)
			await actions.getLikes()
			setLoading(false);
		};
		fetchData();
    }, []);

    const deleteSingleLike = async (coachID) => {
            const existingLike = await store.likes.find((like) => like.source === "client" && like.client_id === loggedClient.id && like.coach_id === coachID);
            actions.deleteLike(existingLike.id, loggedClient.id);
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
					<i className="fa-regular fa-share-from-square fs-3 text-secondary me-2"></i>
						<h4 className="card-title">Request sent</h4>
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
									{store.givenLikesClient.map((user, index) => (
										<tr key={index}>
											<td>
												<div className="d-flex align-items-center">
													<ProfileImage
                                                            photoUrl={user.coach_photo_url}
                                                            className="user-profile-image"
                                                            rounded
                                                        />
													<span className="ms-3">{user.username}</span>
												</div>
											</td>
											<td>
												<Link
													to={`/coach/${user.id}`}
													className="btn btn-card rounded-5"
												>
													<span>Show more</span>
												</Link>
											</td>
											<td className="pe-5"></td>
											<td className="ps-5">
												<div className="d-flex">
														<button
															type="button"
															className="btn btn-dark fw-semibold"
															data-bs-toggle="modal" 
															data-bs-target="#deleteModal"
															onClick={()=> setCoachID(user.id)}
														>
															Cancel request
															<span className="btn-icon-right ms-3">
																<i className="fas fa-times"></i>
															</span>
														</button>
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
		<div className="modal" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="deteleModalLabel">Are you sure to delete this request?</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body pb-0">
        				<p>If you both accepted the request, it may be removed from the "Ready to train" section</p>
      				</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-dark fw-semibold" data-bs-dismiss="modal">Noooo!</button>
						<button type="button" className="btn btn-secondary btn-request fw-semibold" data-bs-dismiss="modal" onClick={()=>deleteSingleLike(coachID)}>Yes, of course!</button>
					</div>
				</div>
			</div>
		</div>
	</div>
		            }
        </>
	);
};