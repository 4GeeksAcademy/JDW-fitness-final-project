import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const updateDiseases = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [kind, setKind] = useState(store.diseasesToEdit?.kind || "");
  const [sintoms, setSintoms] = useState(store.diseasesToEdit?.sintoms || "");

  useEffect(() => {}, []);

  const addDisease = (e) => {
    e.preventDefault();
    if (kind.trim() !== "" && sintoms.trim() !== "") {
      actions.createDisease(kind, sintoms);
      setKind("");
      setSintoms("");
      navigate("/diseases");
    }
  };

  const updateDisease = (e) => {
    e.preventDefault();
    if (kind.trim() !== "" && sintoms.trim() !== "") {
      actions.updateDiseaseAPI(kind, sintoms, store.diseasesToEdit.id);
      setKind("");
      setSintoms("");
      navigate("/diseases");
    }
  };

  return (
    <div className="container">
      <h1> disease {store.diseasesToEdit.id} </h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Kind</label>
          <input value={kind} onChange={(e) => setKind(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Sintoms</label>
          <input value={sintoms} onChange={(e) => setSintoms(e.target.value)} type="text" className="form-control" id="exampleInputPassword1" />
        </div>
        {store.editing ? 
          <button onClick={updateDisease} type="submit" className="btn btn-secondary">Save Modifications</button>
         : 
          <button onClick={addDisease} type="submit" className="btn btn-primary">Add</button>
        }
      </form>
    </div>
  );
};