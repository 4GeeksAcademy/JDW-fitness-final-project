

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			availabilityClient: [],
			clients: [],
			singleClient: {},
			coaches: [],
			singleCoach: {},
			errorForm: null,
			authCoach: false,
			authClient: false,
			matches: [],
			userMatches: [],
			availability: [],
			singleAvailability: {}, 
			likes: [],
			givenLikes: [],
			receivedLikes: [],
			noGivenLikes: [],
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
	// getClients: () => {
	// 	fetch(process.env.BACKEND_URL + "/api/client")
	// 	.then( (response) => response.json())
	// 	.then( data => setStore({ clients: data }))	
	//   },
	getClients: async () => {
		try {
			const resp = await fetch(process.env.BACKEND_URL + "/api/client");
			const data = await resp.json();
			setStore({ clients: data });
		} catch (error) {
			console.error("Error fetching clients:", error);
		}
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
			setSingleCoach: () => {
				setStore({ singleCoach: currentCoach })
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
			logout: () => {
				if (getStore().authCoach) {
					localStorage.removeItem("token_coach");
					localStorage.removeItem("loggedCoach");
					setStore({ authCoach: false })
				}
				else if (getStore().authClient) {
					localStorage.removeItem("token_client");
					localStorage.removeItem("loggedClient");
					setStore({ authClient: false })
				}
			},
			checkAuth: () => {
                const tokenCoach = localStorage.getItem("token_coach");
                if (tokenCoach) {
                    setStore({ authCoach: true });
                } else setStore({ authCoach: false });
				const tokenClient = localStorage.getItem("token_client");
                if (tokenClient) {
                    setStore({ authClient: true });
                } else setStore({ authClient: false });
            },
			setAuth: (rol, bool) => {
				if (rol === "coach") setStore({ authCoach: bool });
				else if (rol === "client") setStore({ authClient: bool });
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
        
       	// LIKES
	  getLikes: async () => {
		try {
			const resp = await fetch(process.env.BACKEND_URL + "/api/like");
			const data = await resp.json();
			setStore({ likes: data });
		} catch (error) {
			console.error("Error fetching likes:", error);
		}
	},
	addLikeAPI: (source, clientID, coachID) => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				"source": source,
				"client_id": clientID,
				"coach_id": coachID
			})
		};
		fetch(process.env.BACKEND_URL + "/api/like", requestOptions)
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
	deleteLike: (likeID) => {
		fetch(process.env.BACKEND_URL + `/api/like/${likeID}`, { method: 'DELETE' })
		.then( () => getActions().getLikes())
	}, 
	getGivenLikes: async (source, coachID) => {
		try {
			await getActions().getLikes()
			await getActions().getClients();

			const allClients = getStore().clients;
			const givenLikes = await getStore().likes.filter((like) => like.source === source && like.coach_id === coachID)
			const givenLikesClientIDs = givenLikes.map(like => like.client_id);
			const givenLikesUsers = allClients.filter(client => givenLikesClientIDs.includes(client.id));

			setStore({ givenLikes: givenLikesUsers })
		} catch (error) {
			console.log("Error getting given likes", error);
		}
	},
	getNoGivenLikes: async (source, coachID) => {
		try {
			await getActions().getLikes()
			await getActions().getClients();

			const allClients = getStore().clients;
			const givenLikes = await getStore().likes.filter((like) => like.source === source && like.coach_id === coachID);
			const givenLikesClientIDs = givenLikes.map(like => like.client_id);
			const noGivenLikes = allClients.filter(client => !givenLikesClientIDs.includes(client.id));

			setStore({ noGivenLikes: noGivenLikes })
		} catch (error) {
			console.log("Error getting no given likes", error);
		}
	},
	getReceivedLikes: async (source, coachID) => {
		try {
			await getActions().getLikes()
			await getActions().getClients();

			const allClients = getStore().clients;
			const receivedLikes = await getStore().likes.filter((like) => like.source === source && like.coach_id === coachID)
			const receivedLikesClientIDs = receivedLikes.map(like => like.client_id);
			const receivedLikesUsers = allClients.filter(client => receivedLikesClientIDs.includes(client.id));

			setStore({ receivedLikes: receivedLikesUsers })
		} catch (error) {
			console.log("Error getting received likes", error);
		}
	},
            // MATCH
      		getMatches: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/match");
					const data = await resp.json();
					setStore({ matches: data });
				} catch (error) {
					console.error("Error fetching likes:", error);
				}
	  		},
			getCoachMatches: async (coachID) => {
				try {
					await getActions().getMatches()
					await getActions().getClients();

					const allClients = getStore().clients;
					const coachMatches = await getStore().matches.filter((match) => match.coach_id === coachID)
					const coachMatchesClientIDs = coachMatches.map(like => like.client_id);
					const usersMatched = allClients.filter(client => coachMatchesClientIDs.includes(client.id));
		
					setStore({ userMatches: usersMatched })
				} catch (error) {
					console.log("Error getting received likes", error);
				}
			},
			deleteMatch: async (clientID, coachID) => {
				try {
					const { matches } = getStore();
					const matchToDelete = matches.find(match => match.coach_id === coachID && match.client_id === clientID);
			
					if (matchToDelete) {
						const resp = await fetch(process.env.BACKEND_URL + `/api/match/${matchToDelete.id}`, { method: 'DELETE' });
						if (resp.ok) {
							const updatedUserMatches = getStore().userMatches.filter(match => match.id !== matchToDelete.id);
							setStore({ userMatches: updatedUserMatches });
						} else {
							console.error("Error deleting match:", resp.statusText);
						}
					} else {
						console.error("Match not found for deletion");
					}
				} catch (error) {
					console.error("Error deleting match:", error);
				}
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
					const response = await fetch(process.env.BACKEND_URL + `/api/activities/${activityFrequencyID}`);
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
			getActions().checkAuth()
		  },    
	  }
  }
};

export default getState;
