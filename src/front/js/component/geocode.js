import React, { useState } from 'react';
import axios from 'axios';

export const GeocodeComponent = () => {
    const [address, setAddress] = useState('');
    const [geocodeResult, setGeocodeResult] = useState(null);

    const handleGeocode = async () => {
        try {
            const response = await axios.get(process.env.BACKEND_URL + '/api/geocode', {
                params: { address }
            });
            setGeocodeResult(response.data);
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
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
            />
            <button onClick={handleGeocode}>Geocode</button>
            {geocodeResult && (
                <pre>{JSON.stringify(geocodeResult, null, 2)}</pre>
            )}
        </div>
    );
};
