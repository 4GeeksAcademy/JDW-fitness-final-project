import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddAvailabilityClient = () => {
  const { id } = useParams(); // Obtén el ID de los parámetros de la ruta
  const { store, actions } = useContext(Context);
  const [client, setClient] = useState(null);

  useEffect(() => {
    // Busca el cliente específico en el store
    const selectedClient = store.clients.find(client => client.id === parseInt(id));
    setClient(selectedClient);
  }, [store.clients, id]);

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Add Availability for {client.name}</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{client.availability_day}</h5>
          <p className="card-text">Email: {client.email}</p>
          <button className="btn btn-success">Add New Availability</button>
          <button className="btn btn-success">update</button>
          
        </div>
      </div>
    </div>
  );
};
