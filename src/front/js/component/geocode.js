import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapComponent } from './mapComponent';

export const GeocodeComponent = () => {
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState(null);
    const [city, setCity] = useState("")
    const [test, setTest] = useState(null)

    const handleGeocode = async () => {
        try {
            const response = await axios.get(process.env.BACKEND_URL + '/api/geocode', {
                params: { address }
            });
            const addressComponents = await response.data.results[0].address_components
            console.log("address component", addressComponents);
            const localityComponent = await addressComponents.find(component => component.types.includes("locality"));
            if (localityComponent) {
            setCity(localityComponent.long_name);
            }   
            // setTest();
            // setCoordinates(response.data.results[0].geometry.location)
        } catch (error) {
            if (error.response) {
                // El servidor respondió con un estado diferente a 2xx
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
            } else if (error.request) {
                // La solicitud se realizó pero no se recibió respuesta
                console.error('Error request:', error.request);
            } else {
                // Algo sucedió al configurar la solicitud
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
        }
    };

    return (
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
            {city &&             
            <h2>{city}</h2>
            }
            {/* {coordinates && (
                <div>
                    <MapComponent 
                    lat = {coordinates.lat}
                    lng = {coordinates.lng} 
                    />
                </div>
            )} */}
        </div>
    );
};
