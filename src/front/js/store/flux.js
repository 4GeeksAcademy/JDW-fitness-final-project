import { Availability } from "../pages/availability";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			availability: [],
			single_availability: {}
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			getAvailability: () => {
				fetch(process.env.BACKEND_URL + "/api/availability")
				.then( (response) => response.json())
				.then( data => setStore({ availability: data }))	
			},
			addAvailabilityAPI: (day, hour) => {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ 
						"day": day,
						"hour": hour 
					})
				};
				fetch(process.env.BACKEND_URL + "/api/availability", requestOptions)
				.then(response => response.json())
				.then(() => getActions().getAvailability())
			},
			loadBeginning: () => {
				getActions().getAvailability()
			}
		}
	};
};

export default getState;
