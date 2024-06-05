import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
const { store, actions } = useContext(Context);
const [username, setUsername] = useState("");
const [currentUser, setCurrentUser] = useState("");
const loggedCoach = JSON.parse(localStorage.getItem("loggedCoach"));
const loggedClient = JSON.parse(localStorage.getItem("loggedClient"));

    // useEffect(() => {
    //     actions.getCoaches()
    //     actions.getClients()
    // },[]);

useEffect(() => {
if (loggedCoach) {
setUsername(loggedCoach.username);
setCurrentUser("client")
}
else if (loggedClient) {
setUsername(loggedClient.username);
setCurrentUser("coach")
}
}, [actions]);

return (
<nav className="navbar navbar-light bg-light">
<div className="container">
<Link to="/">
<span className="navbar-brand mb-0 h1">Home</span>
</Link>
<div className="d-flex" >
<ul className="navbar-nav me-auto mb-2 mb-lg-0 title">
<li className="nav-item my-auto fw-bold">
{/* <Link to={`/${currentUser}/${loggedCoach.id}`} className="nav-link active">
Profile
</Link> */}
</li>
<li className="nav-item my-auto fw-bold">
<Link to={`/${currentUser}`} className="nav-link active">
{currentUser === "client" ? "Client List" : "Coach List"}
</Link>
</li>
<li className="nav-item my-auto fw-bold">
<Link to="/likes/given/" className="nav-link active">
Given Likes
</Link>
</li>
<li className="nav-item my-auto fw-bold">
<Link to="/likes/nogiven/" className="nav-link active">
No Given Likes
</Link>
</li>
<li className="nav-item my-auto fw-bold">
<Link to="/likes/received" className="nav-link active">
Received Likes
</Link>
</li>
<li className="nav-item my-auto fw-bold">
<Link to="/client/match" className="nav-link active">
Matches
</Link>
</li>
</ul>
</div>
{ (store.authCoach || store.authClient) && 
<div className="ms-auto">
<span className="fw-bold me-4">{username}'s session</span>
<Link to="/">
<button onClick={actions.logout} className="btn btn-primary">Log out</button>
</Link>
</div>
}
</div>
</nav>
);
};