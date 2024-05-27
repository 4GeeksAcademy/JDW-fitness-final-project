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
			goalToUpdate: {},
			singleGoal:{},
      diseases: [],
			diseasesToEdit:{},
			singleDiseases: {},
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
				fetch(process.env.BACKEND_URL+"/api/goals")
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
                fetch(process.env.BACKEND_URL + "/api/goals", requestOptions)
                    .then(response => response.json())
					.then(()=>getActions().getGoals())
            },

			deleteGoal: (idToDelete) => {
				fetch(`${process.env.BACKEND_URL}/api/goals/${idToDelete}`, { method: 'DELETE' })
				.then(()=>getActions().getGoals())
			},

			updateGoal: (iDSelected) => {
				const goalSelected = getStore().goals.find(goal => goal.id === iDSelected)
				setStore({ goalToUpdate: goalSelected })
				setStore({editing: true })
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
					.then( setStore({ goalToUpdate: {} }))
					.then(() => getActions().getGoals())
			},
        
      // DISEASES
      getDiseases: () => {
         fetch(process.env.BACKEND_URL + "/api/diseases")
         .then((response) => response.json())
         .then((data) => setStore({ diseases: data }));
      },

			getSingleDiseases: (diseasesID) => {
				fetch(process.env.BACKEND_URL + `/api/diseases/${diseasesID}`)
				.then( (response) => response.json())
				.then( data => setStore({ singleDiseases: data }))
			},  
        
      createDisease: (kind, sintoms) => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            "kind": kind,
            "sintoms": sintoms 
            })
          };
				fetch(process.env.BACKEND_URL + "/api/diseases", requestOptions)
				.then(response => response.json())
				.then(() => getActions().getDiseases());
		},
		deleteDisease: (idToDelete) => {
			fetch(`${process.env.BACKEND_URL}/api/diseases/${idToDelete}`, { method: 'DELETE' })
				.then(() => getActions().getDiseases());
		},
      
    updateDiseases: (diseaseID) => {
			const diseaseSelected = getStore().diseases.find(element => element.id === diseaseID)
			setStore({ singleDiseases: diseaseSelected })	
		},
    
     updateDiseaseAPI: (kind, sintoms, diseaseID) => {
			const requestOptions = {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ 
					"kind": kind,
					"sintoms": sintoms 
				})
			};
			fetch(`${process.env.BACKEND_URL}/api/diseases/${diseaseID}`, requestOptions)
				.then(response => response.json())
				.then(() => {
					setStore({ singleDiseases: {} });
					setStore({editing:false})
					getActions().getDiseases();
			},	  
     
     deleteSingleDisease: () => {
			setStore({ singleDisease: {} });
		  },         
              
    loadBeginning: () => {
        getActions().getGoals()
        getActions().getDiseases()
		}  
	}
};
};

export default getState;
