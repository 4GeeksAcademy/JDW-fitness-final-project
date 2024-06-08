import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { MapComponent } from "../component/mapComponent";

import { Context } from "../store/appContext";

export const UpdateCoach = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [educationID, setEducationID] = useState(0)
    const [experienceID, setExperienceID] = useState(0)
    const [showPassword, setShowPassword] = useState(false)
    const [handleButton, setHandleButton] = useState(false)
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const [city, setCity] = useState("")
    const { coachID } = useParams();

    useEffect(() => {
        actions.getEducation()
        actions.getExperience()
        actions.getSingleCoach(coachID);
    },[])

    useEffect(() => {
        if (store.singleCoach && !username && !email && !password && !firstName && !lastName) {
            setUsername(store.singleCoach.username || "");
            setEmail(store.singleCoach.email || "");
            setPassword(store.singleCoach.password || "");
            setFirstName(store.singleCoach.first_name || "");
            setLastName(store.singleCoach.last_name || "");
            setEducationID(store.singleCoach.education_id || 0);
            setExperienceID(store.singleCoach.experience_id || 0);
        }
    }, [store.singleCoach]);

    useEffect(() => {
        if (!store.errorForm && handleButton && username != "" && email != "" && password != "") {
            navigate("/client");
        }
    },[store.errorForm, handleButton])

    function updateCoach(e) {
        e.preventDefault();
        actions.updateCoachAPI(username, email, password, firstName, lastName, educationID, experienceID, coordinates.lat, coordinates.lng, city, coachID)
        setHandleButton(true)
    };

    const handleGeocode = async () => {
        try {
            const response = await axios.get(process.env.BACKEND_URL + '/api/geocode', {
                params: { address }
            });
            setCoordinates(response.data.results[0].geometry.location)
            const addressComponents = await response.data.results[0].address_components
            const localityComponent = await addressComponents.find(component => component.types.includes("locality"));
            if (localityComponent) {
            setCity(localityComponent.long_name);
            }   
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
        }
    };

    console.log("city", city);

	return (
		<div className="container mt-3">
            <h3 className="text-center mb-2">Coach Update</h3>
            <form>
                <div className="row">
                <div className="mb-3 col-6 offset-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Username"
                    />
                </div>
                <div className="mb-3 col-6 offset-3">
                    <input 
                    type="email" 
                    className="form-control" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email"
                    />
                </div>
                <div className="mb-3 col-6 offset-3">
                    <input 
                    type={showPassword ? "text" : "password"}  
                    className="form-control" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password"
                    />
                    <button 
                    onClick={() => setShowPassword(!showPassword)} 
                    className={`btn fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`} 
                    type="button"
                    >
                    </button>
                </div>
                <div className="mb-3 col-3 offset-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    placeholder="First Name"
                    />
                </div>
                <div className="mb-3 col-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    placeholder="Last Name"
                    />
                </div>
                <select value={educationID} className="form-select form-select-lg mb-3 w-50 offset-3" aria-label=".form-select-lg example" onChange={(e) => setEducationID(e.target.value)}>
                    {educationID == 0 && <option defaultValue>Select your education</option>}
                    {store.education.map((element, index) => (
                            <option key={index} value={element.id}>
                                    {element.rank}
                            </option>          
                    ))}
                </select>
                <select value={experienceID} className="form-select form-select-lg mb-3 w-50 offset-3" aria-label=".form-select-lg example" onChange={(e) => setExperienceID(e.target.value)}>
                    {experienceID == 0 && <option defaultValue>Select your experience</option>}  
                    {store.experience.map((element, index) => (
                            <option key={index} value={element.id}>
                                    {element.time}
                            </option>          
                    ))}
                </select>
                <div>
                    <div className="input-group mb-3">
                        <input 
                        type="text"
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control" 
                        placeholder="Enter address" 
                        aria-label="Adress" 
                        aria-describedby="geocode"/>
                        <button className="btn btn-outline-secondary" type="button" id="geocode" onClick={handleGeocode} >Geocode</button>
                    </div>
                    {(coordinates.lat && coordinates.lng) && (
                        <div className="">
                            <MapComponent 
                            lat = {coordinates.lat}
                            lng = {coordinates.lng} 
                            />
                        </div>
                    )}
                </div>
                {store.errorForm &&                 
                <div className="alert alert-danger mt-4 py-2 d-flex justify-content-center col-6 offset-3" role="alert">
                    {store.errorForm}
                </div>
                }
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-warning fw-bold mt-2" onClick={updateCoach}>Save changes</button>
                    <Link to={`/coach/${coachID}`}>
                        <button className="btn btn-primary ms-3 fw-bold mt-2" >Back to your information</button>
                    </Link>
                </div>
            </form>
		</div>
	);
};
