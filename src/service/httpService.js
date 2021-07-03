import axios from "axios";

export default {
	get: async (url, param) => {
		let result = await axios.get(url, {
			params: param
		});

		return result.data;
	},
	post: async (url, body) => {
		let result = await axios.post(url, body);

		return result.data;
	},
	patch: async (url, body) => {
		let result = await axios.patch(url, body);

		return result.data;
	},
	delete: async (url, param) => {
		let result = await axios.delete(url, {
			params: param
		});

		return result.data;
	}
}