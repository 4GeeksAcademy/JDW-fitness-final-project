import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import ProfileImage from "../component/profileImage"

export const MatchCoach = () => {
    const { store, actions } = useContext(Context);
    const loggedCoach = JSON.parse(localStorage.getItem("loggedCoach"));

    useEffect(() => {
        actions.getUserMatches(loggedCoach.id);
    }, []);

	return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-10 col-xl-10">
                    <div className="d-flex flex-row align-items-center card card-ui-default-1 bg-secondary p-4 col-12">
                        <i className="fa-solid fa-person-running fs-3 text-secondary"></i>
                        <h4 className="ms-3 fw-semibold mb-0">Ready to train</h4>
                    </div>
                </div>
                {store.matchesCoach.map((user, index) => 
                    <div key={index} className="col-10 col-xl-10">
                        <div className="card card-ui-default-1 bg-secondary col-12">
                            <div className="card-body mb-0 d-flex justify-content-between align-items-center">
                                <div className="d-flex">
                                    <ProfileImage photoUrl={user.client_photo_url} sizeClass="user-profile-image" />
                                    <div className="d-flex flex-column justify-content-center ms-3">
                                        <h5 className="card-title mb-3">{user.username}</h5>
                                    </div>
                                </div>
                                <div className="accordion accordion-primary" id={`accordion${index}`}>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed custom-accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseContact${index}`} aria-expanded="false" aria-controls={`collapseContact${index}`}>
                                                Contact me
                                            </button>
                                        </h2>
                                        <div id={`collapseContact${index}`} className="accordion-collapse collapse" data-bs-parent={`#accordion${index}`}>
                                            <div className="accordion-body">
                                                Email to contact: <strong>{user.email}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
