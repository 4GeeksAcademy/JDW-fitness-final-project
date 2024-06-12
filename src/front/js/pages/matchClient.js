import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import ProfileImage from "../component/profileImage"

export const MatchClient = () => {
    const { store, actions } = useContext(Context);
    const loggedClient = JSON.parse(localStorage.getItem("loggedClient"));
    const [ loading, setLoading ] = useState(true);

	useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await actions.getUserMatches(loggedClient.id);
			setLoading(false);
		};
		fetchData();
    }, []);

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
                    <i className="fa-solid fa-person-running fs-3 text-secondary me-2"></i>
                        <h4 className="card-title">Ready to train</h4>
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
                                    {store.matchesClient.map((user, index) => (
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