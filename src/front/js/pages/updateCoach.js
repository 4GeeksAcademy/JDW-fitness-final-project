import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const UpdateCoach = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { coachID } = useParams();
    const initialLoad = useRef(true);

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
    const tokenCoach = localStorage.getItem("token_coach");

    // Redirigir si no hay token
    useEffect(() => {
        console.log("Token from localStorage:", tokenCoach);
        if (!tokenCoach) {
            navigate("/");
        }
    }, [tokenCoach, navigate]);

    // Obtener datos del Coache y frecuencias de actividad al montar el componente
    useEffect(() => {
        if (initialLoad.current) {
            actions.getEducation()
            actions.getExperience()
            actions.getSingleCoach(coachID);
            initialLoad.current = false;
        }
    }, [actions, coachID]);

    // Establecer los datos del coache en el estado local cuando estén disponibles
    useEffect(() => {
        if (store.singleCoach) {
            setUsername(store.singleCoach.username || "");
            setEmail(store.singleCoach.email || "");
            setPassword(store.singleCoach.password || "");
            setFirstName(store.singleCoach.first_name || "");
            setLastName(store.singleCoach.last_name || "");
            setEducationID(store.singleCoach.education_id || 0);
            setExperienceID(store.singleCoach.experience_id || 0);
            setPhotoUrl(store.singleCoach.coach_photo_url || "");
        }
    }, [store.singleCoach]);

    // Navegar de vuelta si la actualización es exitosa
    useEffect(() => {
        if (!store.errorForm && handleButton && username && email && password) {
            navigate("/coach");
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
            coachID
        );
        setHandleButton(true);
        // Obtener los datos actualizados del coache
        actions.getSingleCoach(coachID);
    };

	return (
		<div className="container mt-3">
            <h3 className="text-center mb-2">Actualizar Perfil del Coach</h3>
            <form onSubmit={updateCoach}>
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
                <div className="mb-3 col-6 offset-3">
                        <label className="form-label">Subir Foto de Perfil</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={handleImageChange}
                        />
                        {photoUrl && (
                            <div className="mt-2">
                                <img src={photoUrl} alt="Profile" className="img-thumbnail" style={{ maxWidth: "200px" }} />
                            </div>
                        )}
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
                {store.errorForm && (
                        <div className="alert alert-danger mt-4 py-2 d-flex justify-content-center col-6 offset-3" role="alert">
                            {store.errorForm}
                        </div>
                    )}
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-warning fw-bold mt-2">
                        Save changes
                    </button>
                    <Link to={`/coach/${coachID}`}>
                        <button className="btn btn-primary ms-3 fw-bold mt-2">Back to your information</button>
                    </Link>
                </div>
            </form>
        </div>
	);
};
