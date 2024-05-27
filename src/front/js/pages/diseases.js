import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Diseases = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(()=>{
    actions.getDiseases()
    },[])

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center">Diseases</h1>
        <Link to="/diseases/add">
          <button className="btn btn-warning fw-bold">Add a new Disease</button>
        </Link>
      </div>
  
      <div className="list-group">
        {store.diseases.map((disease, index) => (
          <div key={index} className="list-group-item list-group-item-action mb-2 p-3 d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
              <h5 className="mb-1">Kind: {disease.kind}</h5>
              <p className="mb-1">Sintoms: {disease.sintoms}</p>
              <div className="btn-container">
                <Link to={`/diseases/${disease.id}`} className="btn btn-info btn-sm mt-2">
                  Show More
                </Link>
              </div>
            </div>
            <div>
            <Link to={`/diseases/update/${disease.id}`} className="btn btn-primary">
    Update
</Link>


              <button
                onClick={() => actions.deleteDisease(disease.id)}
                className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
