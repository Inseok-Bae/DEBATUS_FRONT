import axios from "axios";
import clonedeep from "lodash.clonedeep";

axios.interceptors.request.use((config) => {
	config.headers["jwt-auth-token"] = window.sessionStorage.getItem(
		"jwt-auth-token"
	);

	if (config.params) {
		var params_key = Object.keys(config.params);

		let new_params = clonedeep(config.params);

		delete config.params;
		config.params = new_params;

		for (let i = 0; i < params_key.length; i++) {
			let param = config.params[params_key[i]];

			if (
				typeof param == "object" &&
				params_key[i] !== "bindvalues" &&
				param !== null
			) {
				let lis = Object.keys(param);

				for (let j = 0; j < lis.length; j++) {
					if (param[lis[j]] !== "") {
						config.params[params_key[i] + "." + lis[j]] = param[lis[j]];
					}
				}

				delete config.params[params_key[i]];
			} else if (param == "") {
				delete config.params[params_key[i]];
			}
		}
	}

	return config;
});

axios.interceptors.response.use((config) => {

	if (config.headers["jwt-auth-token"] !== undefined) {
		window.sessionStorage.setItem(
			"jwt-auth-token",
			config.headers["jwt-auth-token"]
		);
	};



	return config;
});