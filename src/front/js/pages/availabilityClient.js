// src/components/AvailabilityClient.js

import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';

export const AvailabilityClient = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getAvailabilityClient();
    }, [actions]);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-center">Selecciona un Cliente para Ver sus Días Ocupados</h1>
              
            </div>

            <div className="list-group">
                {store.availabilityClient.map((client, index) => (
                    <div key={index} className="list-group-item list-group-item-action mb-2 p-3 d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column">
                            <h5 className="mb-1">ID: {client.id}</h5>
                            <p className="mb-1">Email: {client.client_email}</p>
                            <p className='mb-1'>Day Availability: {client.availability_day}</p>
                            <div className="btn-container">
                                <Link to={`/client/${client.id}`} className="btn btn-info btn-sm mt-2">
                                    Show More
                                </Link>
                            </div>
                        </div>
                        <div className="d-flex align-items-center mx-3">
                            <Link to={`/client/${client.id}/add-day`} className="btn btn-success btn-sm">
                                Add New Day Available
                            </Link>
                            <span className="ms-2"></span>
                            <Link to={`/client/update/${client.id}`} className="btn btn-secondary btn-sm">
                                Update
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


