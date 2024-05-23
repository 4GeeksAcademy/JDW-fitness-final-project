const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			goals: [],
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
			]
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

			getGoals: () => {
				fetch(process.env.BACKEND_URL+"/api/goals")
				.then( (response) => response.json())
				.then( data => setStore({ goals: data }))	
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
			loadData: ()=>{
				getActions().getGoals()
			}
		}
	};
};

export default getState;
