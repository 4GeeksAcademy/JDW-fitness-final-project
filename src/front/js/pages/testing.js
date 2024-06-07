import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { GeocodeComponent } from "../component/geocode";


export const Testing = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container mt-5">
            <GeocodeComponent />
		</div>
	);
};
