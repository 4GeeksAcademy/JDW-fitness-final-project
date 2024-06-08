import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { MapComponent } from "../component/mapComponent";

import { Context } from "../store/appContext";

export const UpdateClient = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [gender, setGender] = useState("");
    const [physicalHabits, setPhysicalHabits] = useState("");
    const [activityFrequencyID, setActivityFrequencyID] = useState(0)
    const [showPassword, setShowPassword] = useState(false)
    const [handleButton, setHandleButton] = useState(false)
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const [city, setCity] = useState("")
    const {clientID} = useParams();
    
    useEffect(() => {
        actions.getActivityFrequency()
        actions.getSingleClient(clientID);
    },[])

    useEffect(() => {
        if (store.singleClient && !username && !email && !password && !firstName && !lastName) {
            setUsername(store.singleClient.username || "");
            setEmail(store.singleClient.email || "");
            setPassword(store.singleClient.password || "");
            setFirstName(store.singleClient.first_name || "");
            setLastName(store.singleClient.last_name || "");
            setAge(store.singleClient.age || "");
            setHeight(store.singleClient.height || "");
            setWeight(store.singleClient.weight || "");
            setGender(store.singleClient.gender || "");
            setPhysicalHabits(store.singleClient.physical_habits || "");
            setActivityFrequencyID(store.singleClient.activity_frequency || 0);
        }
    }, [store.singleClient]);

    useEffect(() => {
        if (!store.errorForm && handleButton && username != "" && email != "" && password != "") {
            navigate("/coach");
        }
    },[store.errorForm, handleButton])

    function updateClient(e) {
        e.preventDefault();
        actions.updateClientAPI(username, email, password, firstName, lastName, age, height, weight, gender, physicalHabits, activityFrequencyID, coordinates.lat, coordinates.lng, city, clientID)
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

    return (
		<div className="container mt-3">
            <h3 className="text-center mb-2">Client Sign up</h3>
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
                <div className="mb-3 col-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={age} 
                    onChange={(e) => setAge(e.target.value)} 
                    placeholder="Age"
                    />
                </div>
                <div className="mb-3 col-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={height} 
                    onChange={(e) => setHeight(e.target.value)} 
                    placeholder="Height"
                    />
                </div>
                <div className="mb-3 col-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={weight} 
                    onChange={(e) => setWeight(e.target.value)} 
                    placeholder="Weight"
                    />
                </div>
                <div className="mb-3 col-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)} 
                    placeholder="Gender"
                    />
                </div>
                <div className="mb-3 col-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={physicalHabits} 
                    onChange={(e) => setPhysicalHabits(e.target.value)} 
                    placeholder="Physical Habits"
                    />
                </div>
                <select value={activityFrequencyID} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={(e) => setActivityFrequencyID(e.target.value)}>
                    {activityFrequencyID == 0 && 
                    <option defaultValue>Select your activity frequency</option>}  
                    {store.activities.map((element, index) => (
                            <option key={index} value={element.id}>
                                    {element.mode}
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
                    <button type="submit" className="btn btn-warning fw-bold mt-2" onClick={updateClient}>Save changes</button>
                    <Link to={`/client/${clientID}`}>
                        <button className="btn btn-primary ms-3 fw-bold mt-2" >Back to your information</button>
                    </Link>
                </div>
            </form>
		</div>
	);
};