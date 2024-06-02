const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			clients: [],
			singleClient: {},
			coaches: [],
			singleCoach: {},
			errorForm: null,
			authCoach: false,
			matches: [],
			availability: [],
			singleAvailability: {}, 
      goals: [],
			singleGoal:{},
      diseases: [],
			singleDiseases: {},
      experience: [],
			singleExperience: {},
      education: [],
			singleEducation: {},   
	    activities: [],
		  singleActivityFrequency:{},
		  error: null
		},

		actions: {
			// Use getActions to call a function within a fuction
	// CLIENT
	getClients: () => {
		fetch(process.env.BACKEND_URL + "/api/client")
		.then( (response) => response.json())
		.then( data => setStore({ clients: data }))	
	  },
	  getSingleClient: async (clientID) => {
        try {
            const response = await fetch(process.env.BACKEND_URL + `/api/client/${clientID}`);
            const data = await response.json();
            setStore({ singleClient: data });
        } catch (error) {
            console.error("Error fetching single client:", error);
        }
    },
	clientSignUp: (username, email, password) => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				"username": username,
				"email": email,
				"password": password,
			})
		};
		fetch(process.env.BACKEND_URL + "/api/client/signup", requestOptions)
		.then(response => {
			if(response.status == 200) {
				setStore({ errorForm: null })
			}
			return response.json()
		})
		.then(data => {
			if(data.error) {
				setStore({ errorForm: data.error })
			}
		})
	},
	deleteClient: (clientID) => {
		fetch(process.env.BACKEND_URL + `/api/client/${clientID}`, { method: 'DELETE' })
		.then( () => getActions().getClients())
	},
	updateClientAPI: (username, email, password, firstName,lastName,age,height,weight,gender,physicalHabits,activityFrequencyID,clientID) => {
		const requestBody = {
			"username": username,
			"email": email,
			"password": password,
		};
	
		if (firstName) {
			requestBody["first_name"] = firstName;
		}
		if (lastName) {
			requestBody["last_name"] = lastName;
		}
		if (age) {
			requestBody["age"] = age;
		}
		if (height) {
			requestBody["height"] = height;
		}
		if (weight) {
			requestBody["weight"] = weight;
		}
		if (gender) {
			requestBody["gender"] = gender;
		}
		if (physicalHabits) {
			requestBody["physical_habits"] = physicalHabits;
		}
		if (activityFrequencyID !== 0) {
			requestBody["activity_frequency_id"] = activityFrequencyID;
		}
	
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(requestBody)
		};
		fetch(process.env.BACKEND_URL + `/api/client/${clientID}`, requestOptions)
		.then(response => {
			if(response.status == 200) {
				setStore({ errorForm: null })
			}
			return response.json()
		})
		.then(data => {
			if(data.error) {
				setStore({ errorForm: data.error })
			}
		})
	},
      // COACH
			getCoaches: () => {
				fetch(process.env.BACKEND_URL + "/api/coach")
				.then( (response) => response.json())
				.then( data => setStore({ coaches: data }))	
      		},
			getSingleCoach: async (coachID) => {
				await fetch(process.env.BACKEND_URL + `/api/coach/${coachID}`)
				.then( (response) => response.json())
				.then( data => {
					setStore({ singleCoach: data })
				})
			},
			coachSignUp: (username, email, password) => {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						"username": username,
						"email": email,
						"password": password,
					})
				};
				fetch(process.env.BACKEND_URL + "/api/coach/signup", requestOptions)
				.then(response => {
					if(response.status == 200) {
						setStore({ errorForm: null })
						getActions().getCoaches()
					}
					return response.json()
				})
				.then(data => {
					if(data.error) {
						setStore({ errorForm: data.error })
					}
				})
			},
			coachLogin: async (email, password) => {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ 
						"email": email,
						"password": password 
					})
				};
			
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/coach/login", requestOptions);
					
					if (!response.ok) {
						setStore({ errorForm: data.error });
					}
					const data = await response.json();
					setStore({ authCoach: true });
					setStore({ errorForm: null });
					localStorage.setItem("token_coach", data.access_coach_token);
					return data
						// await getActions().getCoaches();
			
						// const loggedCoach = getStore().coaches.find(coach => coach.email === email);
						// localStorage.setItem("loggedCoach", loggedCoach.username);
			
					// 	if (data.access_coach_token) {
					// 	}
					//  else {
						
					// }
				} 
				
				catch (error) {
					setStore({ errorForm: "An error occurred during login. Please try again." });
					console.error("Error during coach login:", error);
				}
			},
			logoutCoach: () => {
				localStorage.removeItem("token_coach");
				localStorage.removeItem("loggedCoach");
				setStore({ authCoach: false })
			},
			checkAuth: () => {
                const tokenCoach = localStorage.getItem("token_coach");
                if (tokenCoach) {
                    setStore({ authCoach: true });
                }
            },
			deleteCoach: (coachID) => {
				fetch(process.env.BACKEND_URL + `/api/coach/${coachID}`, { method: 'DELETE' })
				.then( () => getActions().getCoaches())
			},
			updateCoachAPI: (username, email, password, firstName, lastName, educationID, experienceID, coachID) => {
				const requestBody = {
					"username": username,
					"email": email,
					"password": password,
				};
			
				if (firstName) {
					requestBody["first_name"] = firstName;
				}
				if (lastName) {
					requestBody["last_name"] = lastName;
				}
				if (educationID !== 0) {
					requestBody["education_id"] = educationID;
				}
				if (experienceID !== 0) {
					requestBody["experience_id"] = experienceID;
				}
			
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(requestBody)
				};
				fetch(process.env.BACKEND_URL + `/api/coach/${coachID}`, requestOptions)
				.then(response => {
					if(response.status == 200) {
						setStore({ errorForm: null })
					}
					return response.json()
				})
				.then(data => {
					if(data.error) {
						setStore({ errorForm: data.error })
					}
				})
			},
            // MATCH
      		getMatches: () => {
				fetch(process.env.BACKEND_URL + "/api/match")
				.then( (response) => response.json())
				.then( data => setStore({ matches: data }))	
	  		},
			addMatchAPI: (coachID, clientID) => {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						"coach_id": coachID,
						"client_id": clientID
					})
				};
				fetch(process.env.BACKEND_URL + "/api/match", requestOptions)
				.then(response => {
					if(response.status == 200) {
						setStore({ error: null })
					}
					return response.json()
				})
				.then(data => {
					if(data.error) {
						setStore({ error: data.error })
					}
				})
			},
			deleteMatch: (matchID) => {
				fetch(process.env.BACKEND_URL + `/api/match/${matchID}`, { method: 'DELETE' })
				.then( () => getActions().getMatches())
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
			updateAvailabilityAPI: (day, hour, availabilityID) => {
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
					getActions().getDiseases();
					})
			},					  
    		deleteSingleDisease: () => {
				setStore({ singleDisease: {} });
		  	},  

      		// EXPERIENCE
			getExperience: () => {
				fetch(process.env.BACKEND_URL + "/api/experience")
				.then( (response) => response.json())
				.then( data => setStore({ experience: data }))	
			},
			getSingleExperience: (experienceID) => {
				fetch(process.env.BACKEND_URL + `/api/experience/${experienceID}`)
				.then( (response) => response.json())
				.then( data => setStore({ singleExperience: data }))	
			},
			addExperienceAPI: (time) => {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ 
            		"time": time,
					})
				};
				fetch(process.env.BACKEND_URL + "/api/experience", requestOptions)
				.then(response => response.json())
				.then(() => getActions().getExperience())
			},
			deleteExperience: (experienceID) => {
				fetch(process.env.BACKEND_URL + `/api/experience/${experienceID}`, { method: 'DELETE' })
				.then( () => getActions().getExperience())
			},
			updateExperience: (experienceID) => {
				const experienceSelected = getStore().experience.find(element => element.id === experienceID)
				setStore({ singleExperience: experienceSelected })
			},
			updateExperienceAPI: (time, experienceID) => {
        	const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ 
            	"time": time,
					 })
				};
				fetch(process.env.BACKEND_URL + `/api/experience/${experienceID}`, requestOptions)
					.then(response => response.json())
					.then(() => getActions().getExperience())
					.then( setStore({ singleExperience: {} }))
			},      
        
			// EDUCATION
			getEducation: () => {
				fetch(process.env.BACKEND_URL + "/api/education")
				.then( (response) => response.json())
				.then( data => setStore({ education: data }))	
			},
			getSingleEducation: (educationID) => {
				fetch(process.env.BACKEND_URL + `/api/education/${educationID}`)
				.then( (response) => response.json())
				.then( data => setStore({ singleEducation: data }))	
			},
			addEducationAPI: (rank) => {
        		const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ 
            			"rank": rank,
					})
				};
				fetch(process.env.BACKEND_URL + "/api/education", requestOptions)
				.then(response => response.json())
				.then(() => getActions().getEducation())
			},
			deleteEducation: (educationID) => {
				fetch(process.env.BACKEND_URL + `/api/education/${educationID}`, { method: 'DELETE' })
				.then( () => getActions().getEducation())
			},
			updateEducation: (educationID) => {
				const educationSelected = getStore().education.find(element => element.id === educationID)
				setStore({ singleEducation: educationSelected })
			},
			updateEducationAPI: (rank, educationID) => {
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ 
						"rank": rank,
					 })
				};
				fetch(process.env.BACKEND_URL + `/api/education/${educationID}`, requestOptions)
					.then(response => response.json())
					.then(() => getActions().getEducation())
					.then( setStore({ singleEducation: {} }))
			},
     
			// ACTIVITY FREQUENCY
			getActivityFrequency: () => {
				fetch(process.env.BACKEND_URL+"/api/activities")
				.then( (response) => response.json())
				.then( data => setStore({ activities: data }))	
			},
			getSingleActivityFrequency: async (activityFrequencyID) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + `api/activities/${activityFrequencyID}`);
					const data = await response.json();
					setStore({ singleActivityFrequency: data });
				} catch (error) {
					console.error("Error fetching activity frequency:", error);
				}
			},
			createActivityFrequency: (mode) => {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ 
						"mode": mode,
					})
				};
				fetch(process.env.BACKEND_URL + "/api/activities", requestOptions)
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
			getActions().checkAuth()
		  },    
	  }
  };
};

export default getState;
