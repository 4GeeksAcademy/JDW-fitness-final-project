import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const UpdateDisease = () => {
  const { store, actions } = useContext(Context);
  const [kind, setKind] = useState("");
  const [sintoms, setSintoms] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();
  const { diseaseID } = useParams();

  // Llamada a la acción para obtener la enfermedad cuando cambie diseaseID
  useEffect(() => {
    actions.getSingleDiseases(diseaseID);
  }, [diseaseID]);

  // Actualiza los estados locales cuando store.singleDiseases cambie
  useEffect(() => {
    if (store.singleDiseases) {
      setKind(store.singleDiseases.kind || "");
      setSintoms(store.singleDiseases.sintoms || "");
    }
  }, [store.singleDiseases]);

  // Maneja la actualización de la enfermedad
  const updateDisease = (e) => {
    e.preventDefault();
    if (kind.trim() !== "" && sintoms.trim() !== "") {
      actions.updateDiseaseAPI(kind, sintoms, diseaseID); // Llamada a la acción con los parámetros correctos
      navigate("/diseases");
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <div className="container mt-3">
      <h3>Update disease</h3>
      <form>
        <div className="mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            value={kind}
            onChange={(e) => setKind(e.target.value)}
            placeholder="Kind"
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={sintoms}
            onChange={(e) => setSintoms(e.target.value)}
            placeholder="Sintoms"
          />
        </div>
        {errorMessage && (
          <div className="alert alert-danger mt-4 py-2" role="alert">
            All fields must be filled
          </div>
        )}
        <button type="submit" className="btn btn-warning fw-bold" onClick={updateDisease}>
          Save changes
        </button>
        <Link to="/diseases">
          <button className="btn btn-primary ms-3 fw-bold">Back to Diseases list</button>
        </Link>
      </form>
    </div>
  );
};
