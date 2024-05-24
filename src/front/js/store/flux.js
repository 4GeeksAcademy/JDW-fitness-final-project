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
			singleAvailability: {}, 
			availabilityToEdit: {}, 
			editing: false
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
			getSingleAvailability: (availabilityID) => {
				fetch(process.env.BACKEND_URL + `/api/availability/${availabilityID}`)
				.then( (response) => response.json())
				.then( data => setStore({ singleAvailability: data }))	
			},
			deleteSingleAvailability: () => {
				setStore({ singleAvailability: {} })
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
			deleteAvailability: (availabilityID) => {
				fetch(process.env.BACKEND_URL + `/api/availability/${availabilityID}`, { method: 'DELETE' })
				.then( () => getActions().getAvailability())
			},
			updateAvailability: (availabilityID) => {
				const availabilitySelected = getStore().availability.find(element => element.id === availabilityID)
				setStore({ availabilityToEdit: availabilitySelected })
				setStore({ editing: true })
			},
			updateAvailabilitytAPI: (day, hour, availabilityID) => {
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ 
						"day": day,
						"hour": hour
					 })
				};
				fetch(process.env.BACKEND_URL + `/api/availability/${availabilityID}`, requestOptions)
					.then(response => response.json())
					.then(() => getActions().getAvailability())
					.then( setStore({ availabilityToEdit: {} }))
					.then( setStore({ editing: false }))
			},
			loadBeginning: () => {
				getActions().getAvailability()
			}
		}
	};
};

export default getState;
