import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const AvailabilityCoach = () => {
  const { store, actions } = useContext(Context);
  const { coach_id } = useParams();
  const [newDay, setNewDay] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (coach_id) {
      actions.getSingleAvailabilityCoach(coach_id);
    }
    actions.getAvailability(); // Obtener los días disponibles al montar el componente
  }, [coach_id]);

  const handleAddNewAvailability = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/availability_coach`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: store.coachDetails.username || "coach@example.com",
          availability_day: newDay,
        }),
      });

      if (response.ok) {
        // Vuelve a cargar las disponibilidades
        actions.getSingleAvailabilityCoach(coach_id);
        setModalIsOpen(false);  // Cerrar modal después de agregar disponibilidad
        setNewDay("");  // Limpiar el campo de entrada
      } else {
        console.error("Error adding new availability");
      }
    } catch (error) {
      console.error("Error adding new availability:", error);
    }
  };

  const handleDeleteAvailability = async (availabilityId) => {
    if (coach_id) {
      await actions.deleteAvailabilityCoach(availabilityId, coach_id);
    }
  };

  // Abrir y cerrar el modal usando el estado
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewDay("");  // Limpiar el campo de entrada
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Availability for Coach: {store.coachDetails?.username}</h1>
      
      {store.noAvailabilityMessage ? (
        <div className="text-center">
          <p>Aún no has agregado ningún día de disponibilidad, por favor agrega uno:</p>
          <button className="btn btn-primary" onClick={openModal}>
            Add New Availability
          </button>
        </div>
      ) : (
        Array.isArray(store.singleAvailabilityCoach) && store.singleAvailabilityCoach.length > 0 ? (
          <ul className="list-group">
            {store.singleAvailabilityCoach.map((availability, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  Day: {availability.availability_day} 
                </div>
                <div>
                  <button className="btn btn-secondary btn-sm ml-2" onClick={() => handleDeleteAvailability(availability.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center">
            <p>Loading availability data...</p>
          </div>
        )
      )}

      <button className="btn btn-secondary mt-4" onClick={openModal}>
        Add New Availability
      </button>

      {/* Modal de Bootstrap */}
      {modalIsOpen && (
        <div className="modal show" style={{ display: "block" }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header bg-light">
                <h5 className="modal-title text-secondary">Add New Availability</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="newDay">New Availability Day</label>
                    <select
                      id="newDay"
                      className="form-control"
                      value={newDay}
                      onChange={(e) => setNewDay(e.target.value)}
                    >
                      <option value="">Select a day</option>
                      {store.availability && store.availability.map((availability, index) => (
                        <option key={index} value={availability.day}>
                          {availability.day}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer bg-light">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="button" className="btn btn-secondary" onClick={handleAddNewAvailability}>Add Availability</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};