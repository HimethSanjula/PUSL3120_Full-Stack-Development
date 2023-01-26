const constants = {
	api: {
		baseUrl: process.env.REACT_APP_BASE_URL
	},
	socketURL : process.env.REACT_APP_SOCKET_URL || 'ws://localhost:8000',
	districts: [
		"Ampara",
		"Anuradhapura",
		"Badulla",
		"Batticaloa",
		"Colombo",
		"Galle",
		"Gampaha",
		"Hambantota",
		"Jaffna",
		"Kalutara",
		"Kandy",
		"Kegalle",
		"Kilinochchi",
		"Kurunegala",
		"Mannar",
		"Matara",
		"Monaragala",
		"Mullaitivu",
		"Nuwara Eliya",
		"Polonnaruwa",
		"Puttalam",
		"Ratnapura",
		"Trincomalee",
		"Vavuniya"
	]
	
};

export default constants;
