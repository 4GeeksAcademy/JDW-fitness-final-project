

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			availabilityCoach: [],
			availabilityClient: [],
			clients: [],
			singleClient: {},
			coaches: [],
			singleCoach: {},
			errorForm: null,
			uploadSuccess: false,
			authCoach: false,
			authClient: false,
			availability: [],
			singleAvailability: {}, 
			likes: [],
			matches: [],
			givenLikesCoach: [],
			receivedLikesCoach: [],
			noGivenLikesCoach: [],
			matchesCoach: [],
			givenLikesClient: [],
			receivedLikesClient: [],
			noGivenLikesClient: [],
			matchesClient: [],
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
		  error: null,
		availabilityCoach:[],
		  singleAvailabilityCoach:[],
		  noAvailabilityMessage: false,
		  coachDetails: {
			coach_id: null,
       email: ""
		  },
		availabilityClient:[],
		  singleAvailabilityClient:[],
		  noAvailabilityMessage: false,
		  clientDetails: {
			client_id: null,
			email: "",
			sidebarOpen: false,
		  },
  },
		actions: {
			toggleSidebar: () => {
                const { sidebarOpen } = getStore();
                setStore({ sidebarOpen: !sidebarOpen });
            },
            setSidebarOpen: (isOpen) => {
                setStore({ sidebarOpen: isOpen });
            },
	// CLIENT
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

	clientSignUp: async (username, email, password) => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				"username": username,
				"email": email,
				"password": password,
			})
		};
		try {
			const response = await fetch(process.env.BACKEND_URL + "/api/client/signup", requestOptions);
			const data = await response.json();
			if (response.ok) {
				setStore({ errorForm: null })
				await getActions().getClients()
			} else {
				setStore({ errorForm: data.error })
				return
			}
		} catch(error) {
			console.error("Error during client sign up:", error);
		}
	},
	deleteClient: (clientID) => {
		fetch(process.env.BACKEND_URL + `/api/client/${clientID}`, { method: 'DELETE' })
		.then( () => getActions().getClients())
	},
  updateClientAPI: async (
      username,
      email,
      password,
      firstName,
      lastName,
      physicalHabits,
      photoUrl,
      activityFrequencyID,
      latitude, 
      longitude, 
      city,
      clientID
    ) => {
      // Construcción dinámica del cuerpo de la solicitud
      const requestBody = {
        "username": username,
        "email": email,
        "password": password
      };

      if (firstName) requestBody["first_name"] = firstName;
      if (lastName) requestBody["last_name"] = lastName;
      if (physicalHabits) requestBody["physical_habits"] = physicalHabits;
      if (photoUrl) requestBody["client_photo_url"] = photoUrl;
      if (latitude) requestBody["latitude"] = latitude;
      if (longitude) requestBody["longitude"] = longitude;
      if (city) requestBody["city"] = city;
      if (activityFrequencyID !== 0) requestBody["activity_frequency_id"] = activityFrequencyID;

      const token = localStorage.getItem("token_client");

      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Asegúrate de usar el token correcto
        },
        body: JSON.stringify(requestBody)
      };

      try {
        // Realizar la solicitud al backend para actualizar el perfil del cliente
        const response = await fetch(process.env.BACKEND_URL + `/api/client/${clientID}`, requestOptions);
        const data = await response.json();

        if (response.status === 200) {
          setStore({ errorForm: null, singleClient: data, uploadSuccess: true });
          console.log("Perfil del cliente actualizado con éxito:", data);
        } else {
          setStore({ errorForm: data.error, uploadSuccess: false });
        }
      } catch (error) {
        console.error("Error updating client profile:", error);
        setStore({ errorForm: error.message });
      }
    },
	updateClientAPICalculator: async (
		age,
		height,
		weight,
		gender,
		BMI,
		fat,
		BMR,
		clientID
	) => {
		const token = localStorage.getItem("token_client");
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}` // Asegúrate de usar el token correcto
			},
			body: JSON.stringify({
				"age": age,
				"height": height,
				"weight": weight,
				"gender": gender,
				"bmi": BMI,
				"fat": fat,
				"bmr": BMR
			})
		};

		try {
			// Realizar la solicitud al backend para actualizar el perfil del cliente
			const response = await fetch(process.env.BACKEND_URL + `/api/client/calculator/${clientID}`, requestOptions);
			const data = await response.json();
	
			if (response.status === 200) {
				setStore({ errorForm: null, singleClient: data });
				console.log("Perfil del cliente actualizado con éxito:", data);
			} else {
				setStore({ errorForm: data.error });
			}
		} catch (error) {
			console.error("Error updating client profile:", error);
			setStore({ errorForm: error.message });
		}
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
			coachSignUp: async (username, email, password) => {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						"username": username,
						"email": email,
						"password": password,
					})
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/coach/signup", requestOptions);
					const data = await response.json();
					if (response.ok) {
						setStore({ errorForm: null })
						await getActions().getCoaches()
					} else {
						setStore({ errorForm: data.error })
						return
					}
				} catch(error) {
					console.error("Error during coach sign up:", error);
				}
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
			updateCoachAPI: async (
				username,
				email,
				password,
				firstName,
				lastName,
				educationID, 
        		experienceID,
				photoUrl,
				latitude, 
				longitude, 
				city,
				coachID
				) => {
				// Construcción dinámica del cuerpo de la solicitud
				const requestBody = {
					"username": username,
					"email": email,
					"password": password
				};
			
				if (firstName) requestBody["first_name"] = firstName;
				if (lastName) requestBody["last_name"] = lastName;
				if (educationID !== 0) requestBody["education_id"] = educationID;
				if (experienceID !== 0) requestBody["experience_id"] = experienceID;
				if (photoUrl) requestBody["coach_photo_url"] = photoUrl;
				if (latitude) requestBody["latitude"] = latitude;
				if (longitude) requestBody["longitude"] = longitude;
				if (city) requestBody["city"] = city;
			
				const token = localStorage.getItem("token_coach");
			
				const requestOptions = {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}` // Asegúrate de usar el token correcto
					},
					body: JSON.stringify(requestBody)
				};
			
				try {
					// Realizar la solicitud al backend para actualizar el perfil del cliente
					const response = await fetch(process.env.BACKEND_URL + `/api/coach/${coachID}`, requestOptions);
					const data = await response.json();
			
					if (response.status === 200) {
						setStore({ errorForm: null, singleCoach: data, uploadSuccess: true });
						console.log("Perfil del coach actualizado con éxito:", data);
					} else {
						setStore({ errorForm: data.error, uploadSuccess: false });
					}
				} catch (error) {
					console.error("Error updating coach profile:", error);
					setStore({ errorForm: error.message });
				}
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
			.then( () => getActions().checkAuth())
			.then( () => {
				if(getStore().authCoach){
					getActions().getLikes()
					getActions().getNoGivenLikes(coachID)
					getActions().getReceivedLikes(coachID)
				} else {
					getActions().getLikes()
					getActions().getNoGivenLikes(clientID)
					getActions().getReceivedLikes(clientID)
				}
				
			})
		},
		deleteLike: async (likeID, loggedUserID) => {
			await fetch(process.env.BACKEND_URL + `/api/like/${likeID}`, { method: 'DELETE' })
			await getActions().getGivenLikes(loggedUserID)
			await getActions().getLikes()
		},
		getGivenLikes: async (loggedUserID) => {
			try {
				await getActions().checkAuth()
				const pathLike = getStore().authCoach ? "coach_likes" : "client_likes";

				const resp = await fetch(process.env.BACKEND_URL + `/api/${pathLike}/${loggedUserID}`);
				const data = await resp.json();
				if(getStore().authCoach){
					setStore({ givenLikesCoach: data.given_likes });
				} else {
					setStore({ givenLikesClient: data.given_likes });
				}
			} catch (error) {
				console.error("Error fetching given likes:", error);
			}
		},
		getNoGivenLikes: async (loggedUserID) => {
			try {
				await getActions().checkAuth()
				const pathLike = getStore().authCoach ? "coach_likes" : "client_likes";

				const resp = await fetch(process.env.BACKEND_URL + `/api/${pathLike}/${loggedUserID}`);
				const data = await resp.json();
				if(getStore().authCoach){
					setStore({ noGivenLikesCoach: data.no_given_likes });
				} else {
					setStore({ noGivenLikesClient: data.no_given_likes });
				}
			} catch (error) {
				console.error("Error fetching no given likes:", error);
			}
		},
		getReceivedLikes: async (loggedUserID) => {
			try {
				await getActions().checkAuth()
				const pathLike = getStore().authCoach ? "coach_likes" : "client_likes";

				const resp = await fetch(process.env.BACKEND_URL + `/api/${pathLike}/${loggedUserID}`);
				const data = await resp.json();
				if(getStore().authCoach){
					setStore({ receivedLikesCoach: data.received_likes });
				} else {
					setStore({ receivedLikesClient: data.received_likes });
				}
			} catch (error) {
				console.error("Error fetching received likes:", error);
			}
		},
		getUserMatches: async (loggedUserID) => {
			try {
				await getActions().checkAuth()
				const pathLike = getStore().authCoach ? "coach_likes" : "client_likes";

				const resp = await fetch(process.env.BACKEND_URL + `/api/${pathLike}/${loggedUserID}`);
				const data = await resp.json();
				if(getStore().authCoach){
					setStore({ matchesCoach: data.matches });
				} else {
					setStore({ matchesClient: data.matches });
				}
			} catch (error) {
				console.error("Error fetching received likes:", error);
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

      
      // AVAILABILITY COACH
	  getAvailabilityCoach: () => {
		fetch(`${process.env.BACKEND_URL}/api/availability_coach`)
			.then((response) => response.json())
			.then((data) => {
				console.log("Coach Availability Data:", data);
				setStore({ availabilityCoach: data });
			})
			.catch((error) => console.error("Error fetching coach availability:", error));
	},

	getSingleAvailabilityCoach: async (coach_id) => {
		try {
			const response = await fetch(`${process.env.BACKEND_URL}/api/availability_coach/${coach_id}`);
			if (!response.ok) {
				throw new Error(`Error fetching coach data: ${response.statusText}`);
			}
			const data = await response.json();
	
			// Verificar si se encontraron disponibilidades
			if (data.availabilities.length === 0) {
				setStore({
					singleAvailabilityCoach: [], // No hay disponibilidades
					noAvailabilityMessage: true, // Indicar que no hay disponibilidades
					coachDetails: {
						coach_id: data.coach_id,
						username: data.username // Obtener el email del coach de la respuesta
					}
				});
			} else {
				// Guardar detalles del coach y sus disponibilidades
				setStore({
					singleAvailabilityCoach: data.availabilities,
					noAvailabilityMessage: false,
					coachDetails: {
						coach_id: data.coach_id,
						username: data.username
					}
				});
			}
	
			console.log(`Fetched availability for coach (ID: ${coach_id}):`, data);
		} catch (error) {
			console.error("Error fetching availability coach:", error);
			// Manejar el error y posiblemente actualizar el store para reflejar el error
			setStore({
				singleAvailabilityCoach: [],
				noAvailabilityMessage: true,
				coachDetails: {
					coach_id: coach_id,
					username: "unknown" // Placeholder hasta obtener el email real
				}
			});
		}
	},

	deleteAvailabilityCoach: async (availabilityId, coachId) => {
		try {
			const response = await fetch(`${process.env.BACKEND_URL}/api/availability_coach/day/${availabilityId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
	
			if (!response.ok) {
				throw new Error(`Error deleting availability: ${response.statusText}`);
			}
	
			const data = await response.json();
			console.log(`Deleted availability (ID: ${availabilityId}):`, data);
	
			// Volver a cargar las disponibilidades después de borrar
			await getActions().getSingleAvailabilityCoach(coachId);
		} catch (error) {
			console.error("Error deleting availability:", error);
		}
	},
	
	
	
// AVAILABILITY CLIENT
	getAvailabilityClient: () => {
		fetch(process.env.BACKEND_URL + "/api/availability_client")
		  .then((response) => response.json())
		  .then((data) => {
			console.log("Availability Client Data:", data); 
			setStore({ availabilityClient: data });
		  })
		  .catch((error) => console.error("Error fetching availability client:", error)); 
	  },
	  getSingleAvailabilityClient: async (client_id) => {
		try {
		  const response = await fetch(`${process.env.BACKEND_URL}/api/availability_client/client/${client_id}`);
		  if (!response.ok) {
			throw new Error(`Error fetching client data: ${response.statusText}`);
		  }
		  const data = await response.json();
	  
		  // Verificar si se encontraron disponibilidades
		  if (data.availabilities.length === 0) {
			setStore({
			  singleAvailabilityClient: [], // No hay disponibilidades
			  noAvailabilityMessage: true,  // Indicar que no hay disponibilidades
			  clientDetails: {
				client_id: data.client_id,
				username: data.username // Obtener el email del cliente de la respuesta
			  }
			});
		  } else {
			// Guardar detalles del cliente y sus disponibilidades
			setStore({
			  singleAvailabilityClient: data.availabilities,
			  noAvailabilityMessage: false,
			  clientDetails: {
				client_id: data.client_id,
				username: data.username
			  }
			});
		  }
	  
		  console.log(`Fetched availability for client (ID: ${client_id}):`, data);
		} catch (error) {
		  console.error("Error fetching availability client:", error);
		  // Manejar el error y posiblemente actualizar el store para reflejar el error
		  setStore({
			singleAvailabilityClient: [],
			noAvailabilityMessage: true,
			clientDetails: {
			  client_id: client_id,
			  username: "unknown" // Placeholder hasta obtener el email real
			}
		  });
		}
	  },
	  
	  // DELETE AVAILABILITYCLIENT 

	  deleteAvailabilityClient: async (availabilityId, clientId) => {
		try {
		  const response = await fetch(`${process.env.BACKEND_URL}/api/availability_client/day/${availabilityId}`, {
			method: 'DELETE',
			headers: {
			  'Content-Type': 'application/json'
			}
		  });
	  
		  if (!response.ok) {
			throw new Error(`Error deleting availability: ${response.statusText}`);
		  }
	  
		  const data = await response.json();
		  console.log(`Deleted availability (ID: ${availabilityId}):`, data);
	  
		  // Volver a cargar las disponibilidades después de borrar
		  await getActions().getSingleAvailabilityClient(clientId);
		} catch (error) {
		  console.error("Error deleting availability:", error);
		}
	  },
	  
			  
						  
			  			  

      loadBeginning: () => {
			getActions().checkAuth()
		  },    
	  }
  }
};

export default getState;
