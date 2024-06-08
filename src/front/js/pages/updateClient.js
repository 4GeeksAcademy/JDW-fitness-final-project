import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [gender, setGender] = useState("");
    const [physicalHabits, setPhysicalHabits] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [activityFrequencyID, setActivityFrequencyID] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [handleButton, setHandleButton] = useState(false);
    const tokenClient = localStorage.getItem("token_client");

    // Redirigir si no hay token
    useEffect(() => {
        if (!tokenClient) {
            navigate("/");
        }
    }, [tokenClient, navigate]);

    // Obtener datos del cliente y frecuencias de actividad al montar el componente
    useEffect(() => {
        if (initialLoad.current) {
            actions.getActivityFrequency();
            actions.getSingleClient(clientID);
            initialLoad.current = false;
        }
    }, [actions, clientID]);

    // Establecer los datos del cliente en el estado local cuando estén disponibles
    useEffect(() => {
        if (store.singleClient) {
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
            setActivityFrequencyID(store.singleClient.activity_frequency_id || 0);
            setPhotoUrl(store.singleClient.client_photo_url || "");
        }
    }, [store.singleClient]);

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
    const updateClient = async (e) => {
        e.preventDefault();
        await actions.updateClientAPI(
            username,
            email,
            password,
            firstName,
            lastName,
            age,
            height,
            weight,
            gender,
            physicalHabits,
            photoUrl,
            activityFrequencyID,
            clientID
        );
        setHandleButton(true);
        // Obtener los datos actualizados del cliente
        actions.getSingleClient(clientID);
    };

    return (
        <div className="container mt-3">
            <h3 className="text-center mb-2">Actualizar Perfil del Cliente</h3>
            <form onSubmit={updateClient}>
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
                        />
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
                    <div className="mb-3 col-6 offset-3">
                        <select
                            value={activityFrequencyID}
                            className="form-select form-select-lg mb-3"
                            aria-label="Select your activity frequency"
                            onChange={(e) => setActivityFrequencyID(e.target.value)}
                        >
                            <option defaultValue>Select your activity frequency</option>
                            {store.activities.map((element, index) => (
                                <option key={index} value={element.id}>
                                    {element.mode}
                                </option>
                            ))}
                        </select>
                    </div>
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
                    <Link to={`/client/${clientID}`}>
                        <button className="btn btn-primary ms-3 fw-bold mt-2">Back to your information</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};
