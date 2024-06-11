import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import ProfileImage from "../component/profileImage"

export const GivenLikesClient = () => {
    const { store, actions } = useContext(Context);
    const loggedClient = JSON.parse(localStorage.getItem("loggedClient"));
    const [ coachID, setCoachID ] = useState(0)
    
    useEffect(() => {
        actions.getLikes()
        actions.getGivenLikes(loggedClient.id)
    },[])

    const deleteSingleLike = async (coachID) => {
            const existingLike = await store.likes.find((like) => like.source === "client" && like.coach_id === coachID && like.client_id === loggedClient.id);
            actions.deleteLike(existingLike.id, loggedClient.id);
    }

    return (
	<div className="container">
		<div className="row d-flex justify-content-center">
			<div className="col-10 col-xl-10">
				<div className="d-flex flex-row align-items-center card card-ui-default-1 bg-secondary p-4 col-12">
					<i className="fa-regular fa-share-from-square fs-3 text-secondary"></i>
					<h4 className="ms-3 fw-semibold mb-0">Request sent</h4>
				</div>
			</div>
			{store.givenLikesClient.map((user, index) => 
				<div key={index} className="col-10 col-xl-10">
					<div className="card card-ui-default-1 bg-secondary col-12">
						<div className="card-body mb-0 d-flex justify-content-between align-items-center">
							<div className="d-flex">
							<ProfileImage photoUrl={user.coach_photo_url} sizeClass="user-profile-image" />
								<div className="d-flex flex-column justify-content-center ms-3">
									<h5 className="card-title mb-3">{user.username}</h5>
									<Link to={`/coach/${user.id}`} className="btn btn-card rounded-5">
										<span>Show more information</span>
									</Link>
								</div>
							</div>
							<button className="btn btn-dark fw-semibold" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={()=> setCoachID(user.id)}>
								Cancel your request
								<span className="btn-icon-right ms-3"><i className="fas fa-times"></i></span>
							</button>
						</div>
					</div>
				</div>
			)}
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
	);
};