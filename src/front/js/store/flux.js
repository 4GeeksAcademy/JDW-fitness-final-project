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
      goals: [],
			singleGoal:{},
	  activities: [],
				  singleActivityFrequency:{},
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
      
      // AVAILABILITY
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
				setStore({ singleAvailability: availabilitySelected })
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
					.then( setStore({ singleAvailability: {} }))
			},
			
			// GOALS
			getGoals: () => {
				fetch(process.env.BACKEND_URL+"api/goals")
				.then( (response) => response.json())
				.then( data => setStore({ goals: data }))	
			},
			getSingleGoal: (goalID) => {
				fetch(process.env.BACKEND_URL + `api/goals/${goalID}`)
				.then( (response) => response.json())
				.then( data => setStore({ singleGoal: data }))	
			},
			deleteSingleGoal: () => {
				setStore({ singleGoal: {} })
			},
			createGoal: (kind, description) => {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ 
						"kind": kind,
						"description": description 
					})
				};
				fetch(process.env.BACKEND_URL + "api/goals", requestOptions)
				.then(response => response.json())
				.then(()=>getActions().getGoals())
			},
			
			deleteGoal: (idToDelete) => {
				fetch(`${process.env.BACKEND_URL}/api/goals/${idToDelete}`, { method: 'DELETE' })
				.then(()=>getActions().getGoals())
			},
			
			updateGoal: (iDSelected) => {
				const goalSelected = getStore().goals.find(goal => goal.id === iDSelected)
				setStore({ singleGoal: goalSelected })
			},

			updateGoalAPI: (kind, description, idToEdit) => {
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ 
						"kind": kind,
						"description": description 
					})
				};
				fetch(`${process.env.BACKEND_URL}/api/goals/${idToEdit}`, requestOptions)
				.then(response => response.json())
				.then( setStore({ singleGoal: {} }))
				.then(() => getActions().getGoals())
			},
			
			
			// ACTIVITY FREQUENCY
			getActivityFrequency: () => {
				fetch(process.env.BACKEND_URL+"api/activities")
				.then( (response) => response.json())
				.then( data => setStore({ activities: data }))	
			},
			getSingleActivityFrequency: (activityFrequencyID) => {
				fetch(process.env.BACKEND_URL + `api/activities/${activityFrequencyID}`)
				.then( (response) => response.json())
				.then( data => setStore({ singleActivityFrequency: data }))	
			},
			deleteSingleActivityFrequency: () => {
				setStore({ singleActivityFrequency: {} })
			},
			createActivityFrequency: (mode) => {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ 
						"mode": mode,
					})
				};
				fetch(process.env.BACKEND_URL + "api/activities", requestOptions)
				.then(response => response.json())
				.then(()=>getActions().getActivityFrequency())
			},
			
			deleteActivityFrequency: (idToDelete) => {
				fetch(`${process.env.BACKEND_URL}/api/activities/${idToDelete}`, { method: 'DELETE' })
				.then(()=>getActions().getActivityFrequency())
			},
			
			updateActivityFrequency: (iDSelected) => {
				const activityFrequencySelected = getStore().activities.find(activityFrequency => activityFrequency.id === iDSelected)
				setStore({ singleActivityFrequency: activityFrequencySelected })
			},
			
			updateActivityFrequencyAPI: (mode, idToEdit) => {
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ 
						"mode": mode,
					})
				};
				fetch(`${process.env.BACKEND_URL}/api/activities/${idToEdit}`, requestOptions)
				.then(response => response.json())
				.then( setStore({ singleActivityFrequency: {} }))
				.then(() => getActions().getActivityFrequency())
			},
			loadBeginning: () => {
			getActions().getGoals()
			},
		}
	};
};

export default getState;
