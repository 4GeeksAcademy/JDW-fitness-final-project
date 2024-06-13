import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import { MapComponent } from "../component/mapComponent";
import { Context } from "../store/appContext";

const libraries = ["places"];

export const UpdateCoach = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { coachID } = useParams();
    const initialLoad = useRef(true);
    const initialized = useRef(false); // Nueva referencia para inicialización de valores
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [educationID, setEducationID] = useState(0)
    const [experienceID, setExperienceID] = useState(0)
    const [photoUrl, setPhotoUrl] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [handleButton, setHandleButton] = useState(false);
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const [city, setCity] = useState("")
    const tokenCoach = localStorage.getItem("token_coach");
    const [ loading, setLoading ] = useState(true);
    const searchBoxRef = useRef(null);

    // Redirigir si no hay token
    useEffect(() => {
        if (!tokenCoach) {
            navigate("/");
        }
    }, [tokenCoach, navigate]);
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (initialLoad.current) {
                await actions.getEducation()
                await actions.getExperience()
                await actions.getSingleCoach(coachID);
                initialLoad.current = false;
            }
			setLoading(false);
		};
		fetchData();
    }, [actions, coachID]);

    // Establecer los datos del coach en el estado local cuando estén disponibles
    useEffect(() => {
        if (store.singleCoach && !initialized.current) {
            setUsername(store.singleCoach.username || "");
            setEmail(store.singleCoach.email || "");
            setFirstName(store.singleCoach.first_name || "");
            setLastName(store.singleCoach.last_name || "");
            setEducationID(store.singleCoach.education_id || 0);
            setExperienceID(store.singleCoach.experience_id || 0);
            initialized.current = true; // Marcar como inicializado
        }
    }, [store.singleCoach]);

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
    const updateCoach = async (e) => {
        e.preventDefault();
        await actions.updateCoachAPI(
            username,
            email,
            password,
            firstName,
            lastName,
            educationID, 
            experienceID,
            photoUrl,
            coordinates.lat, 
            coordinates.lng, 
            city,
            coachID
        );
        await actions.getSingleCoach(coachID);
    };

    const handlePlaceChanged = () => {
        const places = searchBoxRef.current.getPlaces();
        if (places.length === 0) return;
        const place = places[0];
        setAddress(place.formatted_address);

        const location = place.geometry.location;
        setCoordinates({
            lat: location.lat(),
            lng: location.lng()
        });

        const addressComponents = place.address_components;
        const localityComponent = addressComponents.find(component => component.types.includes("locality"));
        if (localityComponent) {
            setCity(localityComponent.long_name);
        } else {
            setCity("Unknown city");
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
                                    <form onSubmit={updateCoach}>
                                        <div className="row">
                                        {store.errorForm &&
                                            <div className="form-group col-12">
                                                <div className="alert alert-danger alert-dismissible fade show fw-semibold mb-0 mt-2" role="alert">
                                                    {store.errorForm}
                                                </div>
                                            </div>                 
                                            }
                                            {store.uploadSuccess &&
                                            <div className="form-group col-12">                                     
                                                <div className="alert alert-success alert-dismissible fade show mb-0 mt-2">
                                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>	
                                                    <strong>Done!</strong> Your profile has been updated successfully
                                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close">
                                                    </button>
                                                </div>
                                            </div>
                                            }
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
                                                <span className={`show-pass ${store.errorForm || store.uploadSuccess ? "eye-update-error" : "eye-update"}`} type="button" onClick={() => setShowPassword(!showPassword)} >
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
                                            <div className="form-group col-md-3">
                                                <label>Education</label>
                                                <select value={educationID} className="form-select bootstrap-select mb-3 mt-1 p-3" aria-label="education-selector" onChange={(e) => setEducationID(e.target.value)}>
                                                    {educationID == 0 && <option defaultValue>Select your education</option>}
                                                    {store.education.map((element, index) => (
                                                        <option key={index} value={element.id}>
                                                            {element.rank}
                                                        </option>          
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label>Experience</label>
                                                <select value={experienceID} className="form-select bootstrap-select mb-3 mt-1 p-3" aria-label="experience-selector" onChange={(e) => setExperienceID(e.target.value)}>
                                                    {experienceID == 0 && <option defaultValue>Select your experience</option>}  
                                                    {store.experience.map((element, index) => (
                                                        <option key={index} value={element.id}>
                                                            {element.time}
                                                        </option>          
                                                    ))}
                                                </select>
                                            </div>
                                        <div className="form-group col-md-6">
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
                                        <div className="form-group col-12">
                                            <LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY} libraries={libraries}>
                                                <StandaloneSearchBox
                                                    onLoad={ref => searchBoxRef.current = ref}
                                                    onPlacesChanged={handlePlaceChanged}
                                                >
                                                    <input
                                                        type="text"
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                        className="form-control py-3"
                                                        placeholder="Enter address"
                                                    />
                                                </StandaloneSearchBox>
                                            </LoadScript>
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
                                    <div className="d-flex justify-content-center align-items-center mt-4">
                                        <button type="submit" className="btn btn-secondary light btn-block fw-bolder p-3">Save changes</button>
                                        <Link to={`/coach/${coachID}`} className="text-secondary text-decoration-none ms-5">
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
