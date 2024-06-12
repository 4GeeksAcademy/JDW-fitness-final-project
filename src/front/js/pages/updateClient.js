import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { MapComponent } from "../component/mapComponent";
import { Context } from "../store/appContext";

export const UpdateClient = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { clientID } = useParams();
    const initialLoad = useRef(true);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [physicalHabits, setPhysicalHabits] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [activityFrequencyID, setActivityFrequencyID] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [handleButton, setHandleButton] = useState(false);
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const [city, setCity] = useState("")
    const tokenClient = localStorage.getItem("token_client");
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [ loading, setLoading ] = useState(true);

    // Redirigir si no hay token
    useEffect(() => {
        if (!tokenClient) {
            navigate("/");
        }
    }, [tokenClient, navigate]);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (initialLoad.current) {
                await actions.getActivityFrequency();
                await actions.getSingleClient(clientID);
                initialLoad.current = false;
            }
			setLoading(false);
		};
		fetchData();
    }, [actions, clientID]);

    // Establecer los datos del cliente en el estado local cuando estén disponibles
    useEffect(() => {
        if (store.singleClient) {
            setUsername(store.singleClient.username || "");
            setEmail(store.singleClient.email || "");
            setPassword(store.singleClient.password || "");
            setFirstName(store.singleClient.first_name || "");
            setLastName(store.singleClient.last_name || "");
            setPhysicalHabits(store.singleClient.physical_habits || "");
            setActivityFrequencyID(store.singleClient.activity_frequency_id || 0);
        }
    }, [store.singleClient]);

    // Navegar de vuelta si la actualización es exitosa
    useEffect(() => {
        if (!store.errorForm && handleButton && username && email && password) {
            setUploadSuccess(true)
        }
    }, [store.errorForm, handleButton, username, email, password, navigate]);

    // Manejar la carga de imagen y obtener la URL de Cloudinary
    const handleImageChange = async (e) => {
        const newImageFile = e.target.files[0];

        if (newImageFile) {
            try {
                const formData = new FormData();
                formData.append("file", newImageFile);
                formData.append("upload_preset", "gastondios");
                formData.append("cloud_name", "df7nqepxm");

                const cloudinaryResponse = await fetch(
                    "https://api.cloudinary.com/v1_1/df7nqepxm/image/upload",
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                if (!cloudinaryResponse.ok) {
                    throw new Error("Error uploading image to Cloudinary");
                }

                const cloudinaryData = await cloudinaryResponse.json();
                const cloudinaryImageUrl = cloudinaryData.secure_url;

                console.log("Imagen cargada exitosamente en Cloudinary. URL:", cloudinaryImageUrl);

                setPhotoUrl(cloudinaryImageUrl);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    // Manejar la actualización del perfil
    const updateClient = async (e) => {
        e.preventDefault();
        await actions.updateClientAPI(
            username,
            email,
            password,
            firstName,
            lastName,
            physicalHabits,
            photoUrl,
            activityFrequencyID,
            coordinates.lat, 
            coordinates.lng, 
            city,
            clientID
        );
        setHandleButton(true);
        // Obtener los datos actualizados del cliente
        actions.getSingleClient(clientID);
    };

    const handleGeocode = async () => {
        try {
            const response = await axios.get(process.env.BACKEND_URL + '/api/geocode', {
                params: { address }
            });
    
            if (response.data.results && response.data.results.length > 0) {
                const location = response.data.results[0].geometry.location;
                setCoordinates(location);
    
                const addressComponents = response.data.results[0].address_components;
                const localityComponent = addressComponents.find(component => component.types.includes("locality"));
                if (localityComponent) {
                    setCity(localityComponent.long_name);
                } else {
                    setCity("Unknown city");
                }
            } else {
                console.error("Geocoding response does not contain results.");
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
        <>
        {loading ? 
            <span className="loader"></span>
            :
            <div className="container mt-3">
                <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title fw-semibold ps-0">Update your profile</h5>
                                </div>
                                <div className="card-body">
                                    <div className="basic-form">
                                        <form onSubmit={updateClient}>
                                            <div className="row">
                                                <div className="form-group col-md-4">
                                                    <label>Username</label>
                                                    <input 
                                                    type="text" 
                                                    className="form-control mt-1 p-3" 
                                                    value={username} 
                                                    onChange={(e) => setUsername(e.target.value)} 
                                                    placeholder="Username"/>
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label>Email</label>
                                                    <input 
                                                    type="email" 
                                                    className="form-control mt-1 p-3" 
                                                    value={email} 
                                                    onChange={(e) => setEmail(e.target.value)} 
                                                    placeholder="Email"/>
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label>Password</label>
                                                    <input 
                                                    type={showPassword ? "text" : "password"}
                                                    className="form-control mt-1 p-3" 
                                                    placeholder="******"
                                                    value={password} 
                                                    onChange={(e) => setPassword(e.target.value)} 
                                                    />
                                                    <span className="show-pass eye-update" type="button" onClick={() => setShowPassword(!showPassword)} >
                                                    {showPassword ? 
                                                        <i className="fa fa-eye"></i>
                                                        :
                                                        <i className="fa fa-eye-slash"></i>
                                                    }
                                                    </span>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label>First Name</label>
                                                    <input 
                                                    type="text" 
                                                    className="form-control mt-1 p-3" 
                                                    value={firstName} 
                                                    onChange={(e) => setFirstName(e.target.value)} 
                                                    placeholder="First Name"/>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label>Last Name</label>
                                                    <input 
                                                    type="text" 
                                                    className="form-control mt-1 p-3" 
                                                    value={lastName} 
                                                    onChange={(e) => setLastName(e.target.value)} 
                                                    placeholder="Last Name"/>
                                                </div>
                                                <div className="form-group col-md-6">
                                                <label htmlFor="physical-habits" className="form-label">Physical Habits</label>
                                                    <textarea
                                                        className="form-control mt-1 p-3"
                                                        id="physical-habits"
                                                        rows="6"
                                                        value={physicalHabits}
                                                        onChange={(e) => setPhysicalHabits(e.target.value)}
                                                        placeholder="Write here your physical habits..."
                                                    ></textarea>
                                                </div>
                                                <div className="form-group col-md-6 mb-0 mt-2">
                                                <div className="form-group mt-2 mb-4">
                                                    <label>Activity Frequency</label>
                                                    <select value={activityFrequencyID} className="form-select bootstrap-select mb-3 mt-1 p-3" aria-label="activity-frequency-selector" onChange={(e) => setActivityFrequencyID(e.target.value)}>
                                                        {activityFrequencyID == 0 && <option defaultValue>Select your activity frequency</option>}  
                                                        {store.activities.map((element, index) => (
                                                            <option key={index} value={element.id}>
                                                                {element.mode}
                                                            </option>          
                                                        ))}
                                                    </select>
                                                </div>
                                            <div className="form-group">
                                                <label htmlFor="formFile" className="mb-1">Upload a profile image</label>
                                                <input
                                                type="file"
                                                className="form-control "
                                                id="formFile"
                                                onChange={handleImageChange}
                                                />
                                                {photoUrl && (
                                                    <div className="alert alert-secondary alert-dismissible fade show mt-3">
                                                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                                                        <strong>Done!</strong> Your profile photo updated.
                                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close">
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            </div>
                                            <div className=" col-12">
                                                <div className="input-group col-md-6">
                                                <input 
                                                    type="text"
                                                    value={address} 
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    className="form-control" 
                                                    placeholder="Enter address" 
                                                    aria-label="Adress" 
                                                    aria-describedby="geocode"
                                                />
                                                <button className="btn btn-btn btn-dark fw-semibold" type="button" id="geocode" onClick={handleGeocode} >Geocode</button>
                                            </div>
                                            {(coordinates.lat && coordinates.lng) && (
                                                <div className="col-12 mt-3">
                                                    <MapComponent 
                                                        lat={coordinates.lat}
                                                        lng={coordinates.lng} 
                                                    />
                                                </div>
                                            )}
                                            </div>
                                        </div>
                                        {uploadSuccess &&                                     
                                            <div className="alert alert-success alert-dismissible fade show my-4">
                                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>	
                                                <strong>Done!</strong> Your profile has been updated successfully
                                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close">
                                                </button>
                                            </div>
                                        }
                                        {store.errorForm &&                 
                                            <div className="alert alert-danger alert-dismissible fade show text-center fw-semibold my-4" role="alert">
                                                {store.errorForm}
                                            </div>
                                        }
                                        <div className="d-flex justify-content-center align-items-center mt-4">
                                            <button type="submit" className="btn btn-secondary light btn-block fw-bolder p-3">Save changes</button>
                                            <Link to={`/client/${clientID}`} className="text-secondary text-decoration-none ms-5">
                                                Back to your information
                                            </Link>
                                        </div>   
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
             }
                    </>
    );
};
